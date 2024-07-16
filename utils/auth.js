export function isAuthenticated() {
    if (process.client) {
        const token = localStorage.getItem('access_token')
        return !!token
    }
    return false
}

export function logout() {
    if (process.client) {
        localStorage.removeItem('access_token')
        window.location.href = '/about'
    }
}
