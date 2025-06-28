// app/api/invoice/pdf/route.js

import puppeteer from "puppeteer";
import { formatRupiah } from "../../../../lib/utility/idrFormat";

export async function POST(request) {
    try {
        const invoice = await request.json();

        const html = `

<html>
    <head>
        <style>
            .invoice-box {
                max-width: 800px;
                margin: auto;
                padding: 30px;
                border: 1px solid #eee;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                font-size: 16px;
                line-height: 24px;
                font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial,
                    sans-serif;
                color: #555;
            }

            .invoice-box table {
                width: 100%;
                line-height: inherit;
                text-align: left;
            }

            .invoice-box table td {
                padding: 5px;
                vertical-align: top;
            }

            .invoice-box table tr td:nth-child(2) {
                text-align: right;
            }

            .invoice-box table tr.top table td {
                padding-bottom: 20px;
            }

            .invoice-box table tr.top table td.title {
                font-size: 45px;
                line-height: 45px;
                color: #333;
            }

            .invoice-box table tr.information table td {
                padding-bottom: 40px;
            }

            .invoice-box table tr.heading td {
                background: #eee;
                border-bottom: 1px solid #ddd;
                font-weight: bold;
            }

            .invoice-box table tr.details td {
                padding-bottom: 20px;
            }

            .invoice-box table tr.item td {
                border-bottom: 1px solid #eee;
            }

            .invoice-box table tr.total td:nth-child(2) {
                /* border-top: 2px solid #eee; */
                font-weight: bold;
            }

            @media only screen and (max-width: 600px) {
                .invoice-box table tr.top table td {
                    width: 100%;
                    display: block;
                    text-align: center;
                }

                .invoice-box table tr.information table td {
                    width: 100%;
                    display: block;
                    text-align: center;
                }
            }

            /** RTL **/
            .invoice-box.rtl {
                direction: rtl;
                font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica,
                    Arial, sans-serif;
            }

            .invoice-box.rtl table {
                text-align: right;
            }

            .invoice-box.rtl table tr td:nth-child(2) {
                text-align: left;
            }
        </style>
    </head>

    <body>
        <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
                <tr class="top">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td class="title">
                                    <h3 style="max-width: 300px; color: blue">
                                        INVOICE
                                    </h3>
                                </td>

                                <td>
                                    Invoice #: ${invoice.invoice_number}<br />
                                    Created: ${invoice.created_at}<br />
                                    Due: February 1, 2023
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr class="information">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td style="color: cadetblue">
                                    Laundry, Inc.<br />
                                    081234567890<br />
                                    Salatiga, Central Java, ID
                                </td>

                                <td>
                                    <span style="color: cadetblue"
                                        >Customer :</span
                                    ><br />
                                    ${invoice.user_name}<br />
                                    ${invoice.phone_number}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr class="heading">
                    <td>Payment Method</td>

                    <td>Status</td>
                </tr>

                <tr class="details">
                    <td>Check or Cash</td>

                    <td>${invoice.payment_status}</td>
                </tr>

                <tr class="heading">
                    <td>Item</td>

                    <td>Price</td>
                </tr>

                <tr class="item">
                    <td>${invoice.service_name}</td>

                    <td>${formatRupiah(invoice.total_price)}</td>
                </tr>

            </table>
        </div>
    </body>
</html>
        `;

        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });

        const pdf = await page.pdf({ format: "A4" });
        await browser.close();

        return new Response(pdf, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename=${invoice.invoice_number}.pdf`,
            },
        });
    } catch (error) {
        console.error("Error generating PDF:", error);
        return new Response("Failed to generate PDF", { status: 500 });
    }
}
