import cloudinary from 'cloudinary'


const deleteImageFromCloud = (id) => {
    cloudinary.v2.config({
        cloud_name: 'dzfibdx5d',
        api_key: '779218498774818',
        api_secret: 'dWJ5hcgMuQ0IFc_C0qIKf5HI-vY'
    })

    cloudinary.v2.uploader.destroy(id, function(error, result) { console.log(result) });
}


export default deleteImageFromCloud


