export default {
    name: 'category',
    title: 'category',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
          name: 'image',
          title: 'Image',
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
  