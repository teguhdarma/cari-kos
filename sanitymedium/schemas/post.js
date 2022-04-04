export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "keep title short",
      lang: "tulis lang",
      long:"tulis long",
      type: "string",
      star:"string",
      price:"string",

    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "lang",
      title: "lang",
      type: "string",
    },
    {
        name: "long",
        title: "long",
        type: "string",
      },
      {
        name: "star",
        title: "star",
        type: "string",
      },
      {
        name: "price",
        title: "price",
        type: "string",
      },
      {
        name: "alamat",
        title: "alamat",
        type: "string",
      },
      {
        name: "no",
        title: "no",
        type: "string",
      },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    },
    {
        name: "location",
        title: "location",
        type: "reference",
        to: { type: "location" },
      },
      {
        name: "fasilitas",
        title: "fasilitas",
        type: "reference",
        to: { type: "fasilitas" },
      },
      {
        name: "tipe",
        title: "tipe",
        type: "reference",
        to: { type: "tipe" },
      },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      
    },

    {
        name: "mainImage2",
        title: "Main image2",
        type: "image",
        options: {
          hotspot: true,
        },
      },
      {
        name: "mainImage3",
        title: "Main image3",
        type: "image",
        options: {
          hotspot: true,
        },
      },
      {
        name: "mainImage4",
        title: "Main image4",
        type: "image",
        options: {
          hotspot: true,
        },
      },
      {
        name: "mainImage5",
        title: "Main image5",
        type: "image",
        options: {
          hotspot: true,
        },
      },
      {
        name: "category",
        title: "category",
        type: "reference",
        to: { type: "category" },
      },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
