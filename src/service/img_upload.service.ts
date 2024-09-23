import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';


export async function uploadMedia() {
    const form = new FormData();
    const image_srm = fs.readFileSync(`src/images/whatsappicon.png`);


    form.append('file', image_srm, {
        filename: 'your-file-name.ext',
        contentType: 'your-mime-type'
    });

    form.append('type', 'image/jpeg');
    let headers = form.getHeaders();
    console.log('');
    try {
        const response = await axios.post('https://graph.facebook.com/v20.0/your_phone_number_id/media', form, {
            headers: {
                'Authorization': process.env.TOKEN,
                ...headers
            }
        });
        return response.data.id;
    } catch (error: any) {
        console.error('Error uploading media:', error);
        throw error;
    }
}