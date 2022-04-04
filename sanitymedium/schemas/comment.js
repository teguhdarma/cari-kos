export default {
  name: 'comment',
  title: 'comment',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    
    {
      name: 'email',
      type: 'string',
    },
    {
      name: 'comment',
      type: 'text',
    },
    {
        title: 'Release date',
        name: 'releaseDate',
        type: 'datetime'
      },
    {
      name: 'post',
      type: 'reference',
      to: [{ type: 'post' }],
    },
  ],
};
