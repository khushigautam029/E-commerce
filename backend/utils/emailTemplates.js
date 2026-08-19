// ======================================================
// Welcome Email Template
// ======================================================

const welcomeEmailTemplate = (username) => {
    return {
        subject: "🎉 Welcome to My E-Commerce Store!",
        text: `
Hello ${username},

Welcome to My E-Commerce Store! 🎉

We're excited to have you with us.

Your account has been successfully created, and you're now ready to explore our products and enjoy a smooth shopping experience.

Start shopping and discover something you'll love!

Thank you for choosing My E-Commerce Store.

Happy Shopping! 🛍️

Regards,
My E-Commerce Team

© 2026 My E-Commerce Store
        `,

        // ==================================================
        // HTML Version
        // ==================================================

        html: `
<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Welcome to My E-Commerce Store</title>

</head>


<body
    style="
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: Arial, Helvetica, sans-serif;
    "
>


    <!-- Main Container -->

    <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="
            background-color: #f4f6f8;
            padding: 40px 15px;
        "
    >

        <tr>

            <td align="center">


                <!-- Email Card -->

                <table
                    width="600"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    style="
                        max-width: 600px;
                        width: 100%;
                        background-color: #ffffff;
                        border-radius: 12px;
                        overflow: hidden;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
                    "
                >

                    <tr>

                        <td
                            align="center"
                            style="
                                background-color: #111827;
                                padding: 28px 20px;
                            "
                        >

                            <div
                                style="
                                    font-size: 28px;
                                    font-weight: bold;
                                    color: #ffffff;
                                    letter-spacing: 0.5px;
                                "
                            >
                                🛍️ My E-Commerce
                            </div>

                            <div
                                style="
                                    margin-top: 8px;
                                    font-size: 13px;
                                    color: #d1d5db;
                                "
                            >
                                Shop. Discover. Enjoy.
                            </div>

                        </td>

                    </tr>
                    <tr>

                        <td
                            align="center"
                            style="
                                padding: 45px 35px 25px;
                            "
                        >

                            <!-- Icon -->

                            <div
                                style="
                                    font-size: 48px;
                                    margin-bottom: 15px;
                                "
                            >
                                🎉
                            </div>


                            <!-- Heading -->

                            <h1
                                style="
                                    margin: 0;
                                    color: #111827;
                                    font-size: 28px;
                                    line-height: 1.3;
                                "
                            >
                                Welcome, ${username}!
                            </h1>


                            <!-- Subtitle -->

                            <p
                                style="
                                    margin: 15px 0 0;
                                    color: #6b7280;
                                    font-size: 16px;
                                    line-height: 1.6;
                                "
                            >
                                We're excited to have you as part
                                of the My E-Commerce family.
                            </p>

                        </td>

                    </tr>
                    <tr>

                        <td
                            style="
                                padding: 0 35px 25px;
                            "
                        >

                            <table
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                                style="
                                    background-color: #f9fafb;
                                    border-radius: 10px;
                                "
                            >

                                <tr>

                                    <td
                                        align="center"
                                        style="
                                            padding: 25px;
                                        "
                                    >

                                        <div
                                            style="
                                                font-size: 22px;
                                                margin-bottom: 8px;
                                            "
                                        >
                                            ✅
                                        </div>

                                        <h3
                                            style="
                                                margin: 0 0 8px;
                                                color: #111827;
                                                font-size: 18px;
                                            "
                                        >
                                            Your Account Is Ready
                                        </h3>

                                        <p
                                            style="
                                                margin: 0;
                                                color: #6b7280;
                                                font-size: 14px;
                                                line-height: 1.6;
                                            "
                                        >
                                            Your account has been
                                            successfully created.
                                            You can now start exploring
                                            our store.
                                        </p>

                                    </td>

                                </tr>

                            </table>

                        </td>

                    </tr>


                    <!-- ============================= -->
                    <!-- Message -->
                    <!-- ============================= -->

                    <tr>

                        <td
                            style="
                                padding: 0 40px 25px;
                            "
                        >

                            <p
                                style="
                                    margin: 0;
                                    color: #374151;
                                    font-size: 15px;
                                    line-height: 1.8;
                                    text-align: center;
                                "
                            >
                                Discover products you'll love,
                                add your favorites to your wishlist,
                                and enjoy a simple and convenient
                                shopping experience.
                            </p>

                        </td>

                    </tr>
                    <tr>

                        <td
                            align="center"
                            style="
                                padding: 10px 35px 40px;
                            "
                        >

                            <a
                                href="http://localhost:5173"
                                style="
                                    display: inline-block;
                                    background-color: #111827;
                                    color: #ffffff;
                                    text-decoration: none;
                                    padding: 14px 30px;
                                    border-radius: 8px;
                                    font-size: 15px;
                                    font-weight: bold;
                                "
                            >
                                Start Shopping 🛍️
                            </a>

                        </td>

                    </tr>
                    <tr>

                        <td
                            style="
                                padding: 0 35px;
                            "
                        >

                            <div
                                style="
                                    height: 1px;
                                    background-color: #e5e7eb;
                                "
                            ></div>

                        </td>

                    </tr>

                    <tr>

                        <td
                            align="center"
                            style="
                                padding: 30px 25px;
                            "
                        >

                            <p
                                style="
                                    margin: 0 0 8px;
                                    color: #374151;
                                    font-size: 14px;
                                "
                            >
                                Thank you for choosing
                                <strong>My E-Commerce</strong>.
                            </p>

                            <p
                                style="
                                    margin: 0;
                                    color: #9ca3af;
                                    font-size: 13px;
                                "
                            >
                                Happy Shopping! 🛍️
                            </p>

                        </td>

                    </tr>
                    <tr>

                        <td
                            align="center"
                            style="
                                background-color: #f9fafb;
                                padding: 20px;
                            "
                        >

                            <p
                                style="
                                    margin: 0;
                                    color: #9ca3af;
                                    font-size: 12px;
                                "
                            >
                                © 2026 My E-Commerce Store.
                                All rights reserved.
                            </p>

                        </td>

                    </tr>


                </table>


            </td>

        </tr>

    </table>


</body>

</html>
        `,
    };
};


// ======================================================
// Order Confirmation Email
// ======================================================

const orderConfirmationEmailTemplate = ({
    username,
    orderId,
    items,
    totalPrice,
    paymentMethod,
}) => {

    const itemsHtml = items
        .map((item) => {
            return `
                <tr>

                    <td
                        style="
                            padding: 12px 0;
                            border-bottom: 1px solid #e5e7eb;
                        "
                    >
                        <strong style="color: #111827;">
                            ${item.name}
                        </strong>

                        <br>

                        <span
                            style="
                                color: #6b7280;
                                font-size: 13px;
                            "
                        >
                            Quantity: ${item.quantity}
                        </span>
                    </td>

                    <td
                        align="right"
                        style="
                            padding: 12px 0;
                            border-bottom: 1px solid #e5e7eb;
                            color: #111827;
                            font-weight: bold;
                        "
                    >
                        ₹${item.price * item.quantity}
                    </td>

                </tr>
            `;
        })
        .join("");


    const itemsText = items
        .map((item) => {
            return `${item.name} x ${item.quantity} - ₹${item.price * item.quantity}`;
        })
        .join("\n");


    return {

        subject: `Order Confirmed 🎉 - #${orderId}`,

        // ==================================================
        // Plain Text
        // ==================================================

        text: `
Hello ${username},

Thank you for your order! 🎉

Your order has been successfully placed.

Order ID:
#${orderId}

Payment Method:
${paymentMethod}

Order Items:
${itemsText}

Total Amount:
₹${totalPrice}

We have received your order and will process it shortly.

You will receive another notification when your order status changes.

Thank you for shopping with My E-Commerce.

Happy Shopping! 🛍️

Regards,
My E-Commerce Team
        `,


        // ==================================================
        // HTML
        // ==================================================

        html: `
<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Order Confirmation</title>

</head>


<body
    style="
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: Arial, Helvetica, sans-serif;
    "
>


<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        background-color: #f4f6f8;
        padding: 40px 15px;
    "
>

<tr>

<td align="center">


<!-- ============================================== -->
<!-- Main Card -->
<!-- ============================================== -->

<table
    width="600"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        max-width: 600px;
        width: 100%;
        background-color: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    "
>


<!-- ============================================== -->
<!-- Header -->
<!-- ============================================== -->

<tr>

<td
    align="center"
    style="
        background-color: #111827;
        padding: 28px 20px;
    "
>

<div
    style="
        font-size: 28px;
        font-weight: bold;
        color: #ffffff;
    "
>
    🛍️ My E-Commerce
</div>

<div
    style="
        margin-top: 8px;
        font-size: 13px;
        color: #d1d5db;
    "
>
    Shop. Discover. Enjoy.
</div>

</td>

</tr>


<!-- ============================================== -->
<!-- Success Section -->
<!-- ============================================== -->

<tr>

<td
    align="center"
    style="
        padding: 40px 30px 25px;
    "
>

<div
    style="
        font-size: 48px;
        margin-bottom: 15px;
    "
>
    🎉
</div>


<h1
    style="
        margin: 0;
        color: #111827;
        font-size: 27px;
    "
>
    Order Confirmed!
</h1>


<p
    style="
        margin: 15px 0 0;
        color: #6b7280;
        font-size: 15px;
        line-height: 1.6;
    "
>
    Thank you for your order, ${username}!
    We've received your order successfully.
</p>

</td>

</tr>


<!-- ============================================== -->
<!-- Order Information -->
<!-- ============================================== -->

<tr>

<td style="padding: 0 35px 25px;">


<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        background-color: #f9fafb;
        border-radius: 10px;
    "
>

<tr>

<td style="padding: 20px;">

<p
    style="
        margin: 0 0 8px;
        color: #6b7280;
        font-size: 13px;
    "
>
    ORDER ID
</p>

<p
    style="
        margin: 0;
        color: #111827;
        font-size: 17px;
        font-weight: bold;
    "
>
    #${orderId}
</p>


<p
    style="
        margin: 18px 0 8px;
        color: #6b7280;
        font-size: 13px;
    "
>
    PAYMENT METHOD
</p>

<p
    style="
        margin: 0;
        color: #111827;
        font-size: 15px;
        font-weight: bold;
    "
>
    ${paymentMethod}
</p>

</td>

</tr>

</table>


</td>

</tr>


<!-- ============================================== -->
<!-- Order Items -->
<!-- ============================================== -->

<tr>

<td style="padding: 0 35px 25px;">

<h2
    style="
        margin: 0 0 15px;
        color: #111827;
        font-size: 18px;
    "
>
    Order Summary
</h2>


<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
>

${itemsHtml}

</table>

</td>

</tr>


<!-- ============================================== -->
<!-- Total -->
<!-- ============================================== -->

<tr>

<td style="padding: 0 35px 30px;">

<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
>

<tr>

<td
    style="
        padding-top: 15px;
        color: #111827;
        font-size: 17px;
        font-weight: bold;
    "
>
    Total
</td>

<td
    align="right"
    style="
        padding-top: 15px;
        color: #111827;
        font-size: 20px;
        font-weight: bold;
    "
>
    ₹${totalPrice}
</td>

</tr>

</table>

</td>

</tr>


<!-- ============================================== -->
<!-- Processing Message -->
<!-- ============================================== -->

<tr>

<td
    align="center"
    style="
        padding: 0 35px 35px;
    "
>

<p
    style="
        margin: 0;
        color: #6b7280;
        font-size: 14px;
        line-height: 1.7;
    "
>
    Your order is now being processed.
    We'll keep you updated when your order status changes.
</p>

</td>

</tr>


<!-- ============================================== -->
<!-- Divider -->
<!-- ============================================== -->

<tr>

<td style="padding: 0 35px;">

<div
    style="
        height: 1px;
        background-color: #e5e7eb;
    "
></div>

</td>

</tr>


<!-- ============================================== -->
<!-- Footer -->
<!-- ============================================== -->

<tr>

<td
    align="center"
    style="
        padding: 28px 25px;
    "
>

<p
    style="
        margin: 0 0 8px;
        color: #374151;
        font-size: 14px;
    "
>
    Thank you for shopping with
    <strong>My E-Commerce</strong>.
</p>

<p
    style="
        margin: 0;
        color: #9ca3af;
        font-size: 13px;
    "
>
    Happy Shopping! 🛍️
</p>

</td>

</tr>


<!-- ============================================== -->
<!-- Copyright -->
<!-- ============================================== -->

<tr>

<td
    align="center"
    style="
        background-color: #f9fafb;
        padding: 20px;
    "
>

<p
    style="
        margin: 0;
        color: #9ca3af;
        font-size: 12px;
    "
>
    © 2026 My E-Commerce Store.
    All rights reserved.
</p>

</td>

</tr>


</table>

</td>

</tr>

</table>

</body>

</html>
        `,
    };
};


module.exports = {
    welcomeEmailTemplate,
    orderConfirmationEmailTemplate,
};

