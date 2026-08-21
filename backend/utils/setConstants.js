const STATUS_CODES = {
    // Success
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,

    // Client Errors
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,

    // Server Errors
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
};

const MESSAGES = {
    // Authentication
    REGISTER_SUCCESS: "User registered successfully.",
    LOGIN_SUCCESS: "Login successful.",
    LOGOUT_SUCCESS: "Logout successful.",

    // Validation
    VALIDATION_ERROR: "Validation failed.",
    INVALID_CREDENTIALS: "Invalid username, phone number, or password.",
    USER_ALREADY_EXISTS: "User already exists.",
    USER_NOT_FOUND: "User not found.",
    USERS_FETCHED_SUCCESSFULLY:"Users fetched successfully",
    USERNAME_ALREADY_EXISTS:"Username already exists",
    CURRENT_PASSWORD_IS_INCORRECT:"Current password is incorrect",
    NEW_PASSWORD_SHOULD_BE_DIFFER_FROM_CURRENT:"New password must be different from current password",

    // Token
    TOKEN_REQUIRED: "Access token is required.",
    INVALID_TOKEN: "Invalid or expired token.",
    ACCESS_DENIED: "Access denied.",

    // Server
    SERVER_ERROR: "Internal server error.",
    DATABASE_ERROR: "Database error occurred.",

    // General
    SUCCESS: "Success.",
    FAILED: "Failed.",

    // Product
    PRODUCT_CREATED: "Product added successfully.",
    PRODUCT_UPDATED: "Product updated successfully.",
    PRODUCT_DELETED: "Product deleted successfully.",
    PRODUCT_NOT_FOUND: "Product not found.",
    PRODUCT_ALREADY_EXISTS: "Product already exists.",
    PRODUCT_FETCHED: "Products fetched successfully.",
    INVALID_PRODUCT_ID:"Invalid product ID",
    PRODUCT_ADDED_TO_WISHLIST:"Product added to wishlist",
    PRODUCT_ALREADY_IN_WISHLIST:"Product is already in wishlist",
    FAILED_TO_ADD_PRODUCT_TO_WISHLIST:"Failed to add product to wishlist",

    ORDER_CREATED: "Order placed successfully.",
    ORDER_FETCHED: "Orders fetched successfully.",
    ORDER_UPDATED: "Order updated successfully.",
    ORDER_DELETED: "Order deleted successfully.",
    ORDER_NOT_FOUND: "Order not found.",
    ORDER_CANCELLED:"Order is cancelled",

    // Cart
    CART_FETCHED: "Cart fetched successfully.",
    CART_ITEM_ADDED: "Product added to cart.",
    CART_ITEM_UPDATED: "Cart updated successfully.",
    CART_ITEM_REMOVED: "Item removed from cart.",
    CART_CLEARED: "Cart cleared successfully.",
    CART_EMPTY: "Your cart is empty.",
    CART_ITEM_NOT_FOUND: "Cart item not found.",

    // Profile

    PROFILE_FETCHED: "Profile fetched successfully.",
    PROFILE_UPDATED: "Profile updated successfully.",
    PASSWORD_CHANGED: "Password changed successfully.",
    ACCOUNT_DELETED: "Account deleted successfully.",
    INCORRECT_PASSWORD: "Current password is incorrect.",

    NOTIFICATIONS_FETCHED_SUCCESSFULLY:"Notifications fetched successfully",
    NOTIFICATION_NOT_FOUND:"Notification not found",
    NOTIFICATION_MARKED_AS_READ:"Notification marked as read",
    ALL_NOTIFICATIONS_MARKED_AS_READ:"All notifications marked as read",
    NOTIFICATION_DELETED_SUCCESSFULLY:"Notification deleted successfully",

    ONLY_PENDING_ORDERS_CAN_BE_CANCELLED:"Only pending orders can be cancelled",
    PAGE_MUST_BE_A_POSITIVE_INTEGER:"Page must be a positive integer",
    LIMIT_MUST_BE_A_POSITIVE_INTEGER:"Limit must be a positive integer",
    LIMIT_CANNOT_EXCEED_100:"Limit cannot exceed 100",
    MINIMUM_PRICE_MUST_BE_A_VALID_NUMBER:"Minimum price must be a valid positive number",
    MAXIMUM_PRICE_MUST_BE_A_VALID_NUMBER:"Maximum price must be a valid positive number",
    MINIMUM_PRICE_CANNOT_BE_GREATER_THAN_MAXIMUM_PRICE:"Minimum price cannot be greater than maximum price",
    PRODUCT_ADDED_TO_RECENTLY_VIEWED:"Product added to recently viewed",
    PRODUCT_NOT_IN_RECENTLY_VIEWED:"Product is not in recently viewed",
    PRODUCT_REMOVED_FROM_RECENTLY_VIEWED:"Product removed from recently viewed",

    RECENTLY_VIEWED_IS_ALREADY_EMPTY:"Recently viewed is already empty",
    RECENTLY_VIEWED_PRODUCTS_CLEARED_SUCCESSFULLY:"Recently viewed products cleared successfully",
    YOU_ALREADY_REVIEWED_THIS_PRODUCT:"You have already reviewed this product",
    REVIEW_ADDED_SUCCESSFULLY:"Review added successfully",
    REVIEWS_FETCHED_SUCCESSFULLY:"Reviews fetched successfully",
    REVIEW_NOT_FOUND:"Review not found",
    REVIEW_UPDATED_SUCCESSFULLY:"Review updated successfully",
    REVIEW_DELETED_SUCCESSFULLY:"Review deleted successfully",

    PHONE_NUMBER_ALREADY_EXISTS:"Phone number already exists",
    EMAIL_ALREADY_EXISTS:"Email already exists",
    WISHLIST_IS_EMPTY:"Wishlist is empty",
    FAILED_TO_FETCH_WISHLIST:"Failed to fetch wishlist",
    WISHLIST_NOT_FOUND:"Wishlist not found",
    PRODUCT_NOT_IN_WISHLIST:"Product is not in wishlist",
    PRODUCT_REMOVED_FROM_WISHLIST:"Product removed from wishlist",
    FAILED_TO_REMOVE_PRODUCT_FROM_WISHLIST:"Failed to remove product from wishlist",
    WISHLIST_CLEARED_SUCCESSFULLY:"Wishlist cleared successfully",
    FAILED_TO_CLEAR_WISHLIST:"Failed to clear wishlist",

    USERNAME_IS_REQUIRED:"Username is required",
    USERNAME_MUST_BE_AT_LEAST_3_CHAR:"Username must be at least 3 characters",
    USERNAME_CANNOT_EXCEED_30_CHAR:"Username cannot exceed 30 characters",
    PHONE_NUMBER_MUST_BE_VALID_10_DIGIT:"Phone number must be a valid 10-digit Indian mobile number",
    PHONE_NUMBER_REQUIRED:"Phone number is required",
    PASSWORD_MUST_BE_6_CHAR:"Password must be at least 6 characters",
    PASSWORD_CANNOT_EXCEED_20_CHAR:"Password cannot exceed 20 characters",
    PASSWORD_VALIDATION:"Password must contain uppercase, lowercase, number and special character",
    PRODUCT_REQUIRED:"Product is required",
    QUANTITY_MUST_BE_ATLEAST_1:"Quantity must be at least 1",

    INVALID_USERID:"Invalid user ID",
    USERID_REQUIRED:"User ID is required",
    INVALID_ORDERID:"Invalid order ID",
    INVALID_NOTIFICATION_TYPE:"Invalid notification type",
    NOTIFICATION_TYPE_IS_REQUIRED:"Notification type is required",
    PRODUCT_NAME_REQUIRED:"Product name is required",
    PRODUCT_NAME_ATLEAST_3_CHAR:"Product name should be at least 3 characters",
    DESCRIPTION_REQUIRED:"Description is required",
    CATEGORY_REQUIRED:"Category is required",
    PRICE_MUST_BE_NUMBER:"Price must be a number",
    PRICE_MUST_BE_GREATER_THAN_0:"Price must be greater than zero",

    PRODUCT_ID_REQUIRED:"Product id is required",
    QUANTITY_MUST_BE_NUMBER:"Quantity must be a number",
    QUANTITY_MUST_BE_WHOLE_NUMBER:"Quantity must be a whole number",
    QUANTITY_MUST_BE_ATLEAST_1:"Quantity must be at least 1",
    QUANTITY_REQUIRED:"Quantity is required",
    EMAIL_REQUIRED:"Email is required",
    PASSWORD_REQUIRED:"Password is required"

};

module.exports = {
    STATUS_CODES,
    MESSAGES,
};