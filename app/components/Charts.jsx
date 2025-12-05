"use client";

import dynamic from "next/dynamic";
import React, { Component } from "react";
// import Chart from "react-apexcharts";
import { getInvoice } from "../../lib/api/invoice";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

class Charts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allInvoices: [],
            options: {
                chart: {
                    id: "invoice-bar",
                },
                xaxis: {
                    categories: [],
                },
            },
            series: [
                {
                    name: "Paid",
                    data: [],
                },
                {
                    name: "Not Paid",
                    data: [],
                },
            ],
        };
    }

    async componentDidMount() {
        try {
            const invoice = await getInvoice();
            this.setState({ allInvoices: invoice }, () => {
                this.updateChartData(invoice);
            });
        } catch (err) {
            console.error("Gagal fetch invoice:", err);
        }
    }

    handleStatusChange = (e) => {
        const status = e.target.value;
        this.setState({ selectedStatus: status }, () => {
            const filtered =
                status === "all"
                    ? this.state.allInvoices
                    : this.state.allInvoices.filter(
                          (inv) => inv.payment_status === status
                      );
            this.updateChartData(filtered);
        });
    };

    updateChartData(invoices) {
        // hitung jumlah per bulan
        const monthSet = new Set();
        invoices.forEach((inv) => {
            const date = new Date(inv.created_at);
            const monthYear = date.toLocaleString("default", {
                month: "long",
                year: "numeric",
            });
            monthSet.add(monthYear);
        });

        // urutkan bulan sesuai kronologi
        const categories = Array.from(monthSet).sort((a, b) => {
            const [ma, ya] = a.split(" ");
            const [mb, yb] = b.split(" ");
            return new Date(`${ma} 1, ${ya}`) - new Date(`${mb} 1, ${yb}`);
        });

        const paidData = categories.map(
            (month) =>
                invoices.filter(
                    (inv) =>
                        inv.payment_status === "paid" &&
                        new Date(inv.created_at).toLocaleString("default", {
                            month: "long",
                            year: "numeric",
                        }) === month
                ).length
        );

        const notPaidData = categories.map(
            (month) =>
                invoices.filter(
                    (inv) =>
                        inv.payment_status === "not_paid" &&
                        new Date(inv.created_at).toLocaleString("default", {
                            month: "long",
                            year: "numeric",
                        }) === month
                ).length
        );

        this.setState({
            options: { ...this.state.options, xaxis: { categories } },
            series: [
                { name: "Paid", data: paidData },
                { name: "Not Paid", data: notPaidData },
            ],
        });
    }

    render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="bar"
                            width="500"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Charts;
