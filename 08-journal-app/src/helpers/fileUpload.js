export const fileUpload = async (file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/aaroncito/upload';

    // ? JS has FormData api -> create form data to send to APIs
    const formData = new FormData();
    // field, value
    formData.append('upload_preset','react-journal');
    formData.append('file', file);

    try {

        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if ( resp.ok ) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            return null;
        }

    } catch (err) {
        throw err;
    }

    // return img url
}