<script>
    export let error;
</script>

<div class="error-container flex flex-col justify-center">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <p>Error: {error?.message || "Unknown error"}</p>
    <a href="/" class="home-link w-fit align-middle ml-auto mr-auto">Go to Home</a>
</div>

<style>
    .error-container {
        min-height: 80vh;
        text-align: center;
        padding: 2rem;
    }
    .home-link {
        display: inline-block;
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 5px;
    }
    .home-link:hover {
        background-color: #0056b3;
    }
</style>
