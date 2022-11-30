
const getToken = (email) => {

    console.log(email)
    fetch(`https://phone-buy-and-sell-server.vercel.app/jwt?email=${email}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data?.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
            }
        })
}
export default getToken;