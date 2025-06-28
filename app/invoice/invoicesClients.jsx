"use client";

import { Button, Card, Col, Row, Input, Alert, message } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { useEffect, useState } from "react";
import { getInvoice } from "../../lib/api/invoice";
import { formatRupiah } from "../../lib/utility/idrFormat";
import {
    AudioOutlined,
    PrinterOutlined,
    WhatsAppOutlined,
} from "@ant-design/icons";

const { Search } = Input;

const InvoicesClients = () => {
    const [invoices, setInvoices] = useState([]);

    const handleDownloadPDF = async (invoice) => {
        const response = await fetch("/api/invoice/pdf", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(invoice),
        });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${invoice.invoice_number}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const handleSendWhatsApp = (invoice) => {
        if (!invoice.phone_number) {
            console.log("phone number check : ", invoice.phone_number);

            message.warning(
                "Phone number doesn't exit, please input phone number before send the invoice to WhatsApp"
            );
        }
        const phone = invoice.phone_number.replace(/^0/, "62");

        const text = `Halo ${
            invoice.user_name
        }, berikut adalah invoice Anda:\nNomor: ${
            invoice.invoice_number
        }\nTotal: ${formatRupiah(invoice.total_price)}`;

        const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        window.open(waUrl, "_blank");
    };

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const res = await getInvoice();
                setInvoices(res);
            } catch (err) {
                console.error("Failed to fetch invoices:", err.message);
            }
        };
        fetchInvoices();
    }, []);

    const onSearch = (value, _e, info) => {
        console.log(info?.source, value);
    };

    return (
        <>
            <div className="flex w-full justify-between mb-3 mt-5">
                <div className="w-1/2">
                    <h3 className="capitalize mb-3">invoices</h3>
                </div>

                <div className="w-1/2">
                    <Search
                        placeholder="Search Invoices"
                        onSearch={onSearch}
                        enterButton
                    />
                </div>
            </div>

            <Row gutter={16}>
                {invoices.map((inv) => (
                    <Col span={8} key={inv.id}>
                        <Card
                            title={`Invoice : ${inv.invoice_number}`}
                            variant="borderless"
                            className="capitalize"
                            actions={[
                                <Button
                                    key="print"
                                    color="blue"
                                    variant="outlined"
                                    onClick={() => handleDownloadPDF(inv)}
                                    icon={<PrinterOutlined />}
                                />,
                                <Button
                                    key="whatsapp"
                                    color="green"
                                    variant="outlined"
                                    onClick={() => handleSendWhatsApp(inv)}
                                    icon={<WhatsAppOutlined />}
                                />,
                            ]}
                        >
                            <div className="space-y-1.5">
                                <p>
                                    <b>Customer:</b> {inv.user_name}
                                </p>
                                <p>
                                    <b>Phone Number:</b>{" "}
                                    {inv.phone_number ?? "-"}
                                </p>
                                <p>
                                    <b>Service:</b> {inv.service_name}
                                </p>
                                <p>
                                    <b>Total Weight:</b>{" "}
                                    {inv.total_weight ?? "-"}{" "}
                                    {inv.total_weight == null ? "" : inv.unit}
                                </p>
                                <p>
                                    <b>Total Item:</b> {inv.total_item ?? "-"}{" "}
                                    {inv.total_item == null ? "" : inv.unit}
                                </p>
                                <p>
                                    <b>Total Price:</b>{" "}
                                    {formatRupiah(inv.total_price)}
                                </p>
                                <p>
                                    <b>Payment Status:</b> {inv.payment_status}
                                </p>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default InvoicesClients;
