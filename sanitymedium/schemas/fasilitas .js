export default {
  name: 'fasilitas',
  title: 'fasilitas',
  type: 'document',
  fields: [
   
    {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'image1',
        title: 'Image1',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'image2',
        title: 'Image2',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'image3',
        title: 'Image3',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'image4',
        title: 'Image4',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
     
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
}
