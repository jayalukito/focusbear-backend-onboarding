# Making API calls with Axios #94

## Why is it useful to create a reusable Axios instance?
A reusable Axios instance keeps common configuration such as the base URL, headers, timeout, and interceptors in one place. This reduces duplicated code and makes API requests easier to maintain.

## How does intercepting requests help with authentication?
A request interceptor can automatically retrieve and attach the authentication token to every API request. This avoids manually adding the authorization header each time.

## What happens if an API request times out, and how can you handle it?
If a request exceeds the configured timeout, Axios rejects the request with an error. The error can be handled with try/catch to show an error message, retry the request, or perform another appropriate action.