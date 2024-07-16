export default function ({ redirect }) {
    if (process.client) {
        const token = localStorage.getItem('access_token')
        if (token) {
            return redirect('/index')  // Перенаправьте пользователя, если он уже залогинен
        }
    }
}
