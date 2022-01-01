const sendFormData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

const getMenuData = async () => {
    const request = await fetch(' http://localhost:3000/menu');

    if (!request.ok) {
        throw newError(`Could not fetch ${url}, status: ${request.status}`);
    }
    return await request.json();
}

export { sendFormData };
export { getMenuData };