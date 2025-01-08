import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

//llenar esos datos 
cloudinary.config({
  cloud_name: 'curso-react-aisz',
  api_key: '289961337413572',
  api_secret:'hkAuka-ncGmsd0Cpj4JxhVxdcVk',
  secure: true
})


describe('Pruebas en fileUpload', () => { 
    test('debe de subir el archivo correctamente a cloudinary', async() => { 
        
        const imageUrl = 'https://media.istockphoto.com/id/636379014/es/foto/manos-la-formaci%C3%B3n-de-una-forma-de-coraz%C3%B3n-con-silueta-al-atardecer.jpg?s=612x612&w=0&k=20&c=R2BE-RgICBnTUjmxB8K9U0wTkNoCKZRi-Jjge8o_OgE=';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload( file );

        expect( typeof(url) ).toBe('string');

        const segments = url.split('/');
        // console.log(segments);
        
        const imageId = segments[segments.length - 1].replace('.jpg', '');

        const cloudResp = await cloudinary.api.delete_resources( [imageId], {
            resource_type: 'image'
        });
        
        // console.log({cloudResp});
        
    });

    test('should return null', async() => {
        const file = new File([], 'foto.jpg');

        const url = await fileUpload( file );

        expect( url ).toBe(null);
    })
})