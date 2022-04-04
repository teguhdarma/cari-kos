import { GetStaticProps } from "next";
import React, { useState } from "react";
import Header from "../../components/Header";
import Jumbutron from "../../components/Jumbutron";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { MapIcon, PhoneIcon } from "@heroicons/react/solid";
import Map, { Marker } from "react-map-gl";
import { useRef, useEffect } from 'react';
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";






interface IFormInput {
    _id: string;
    name: string;
    email: string;
    comment: string;
}

interface Props {
    post: Post;
}
function Post({ post }: Props) {



    const maxScrollWidth = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carousel = useRef(null);

    const movePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevState) => prevState - 1);
        }
    };

    const moveNext = () => {
        if (
            carousel.current !== null &&
            carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
        ) {
            setCurrentIndex((prevState) => prevState + 1);
        }
    };

    const isDisabled = (direction) => {
        if (direction === 'prev') {
            return currentIndex <= 0;
        }

        if (direction === 'next' && carousel.current !== null) {
            return (
                carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
            );
        }

        return false;
    };

    useEffect(() => {
        if (carousel !== null && carousel.current !== null) {
            carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
        }
    }, [currentIndex]);

    useEffect(() => {
        maxScrollWidth.current = carousel.current
            ? carousel.current.scrollWidth - carousel.current.offsetWidth
            : 0;
    }, []);





    const features = [
        { name: "Origin", description: "Designed by Good Goods, Inc." },
        {
            name: "Material",
            description:
                "Solid walnut base with rare earth magnets and powder coated steel card cover",
        },
        { name: "Dimensions", description: '6.25" x 3.55" x 1.15"' },
        {
            name: "Finish",
            description: "Hand sanded and finished with natural oil",
        },
        { name: "Includes", description: "Wood card tray and 3 refill packs" },
        {
            name: "Considerations",
            description:
                "Made from natural materials. Grain and color vary with each item.",
        },
    ];
    // Set your mapbox token here



    const [submitted, setSubmitted] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>();
    console.log(post);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        fetch("/api/createComment", { method: "POST", body: JSON.stringify(data) })
            .then(() => {
                console.log(data);
                setSubmitted(true);
                Swal.fire("terima kasih!", "sudah terkirim!", "success");
            })
            .catch((err) => {
                console.log(err);
                setSubmitted(false);
            });
    };
    const MySwal = withReactContent(Swal);
    return (
        <main>
            <Header />

            {post.mainImage && (
                <img
                    className="h-60 w-full object-cover "
                    src={urlFor(post.mainImage).url()!}
                    alt=""
                />
            )}
            <article className="max-w-7xl mx-auto p-5">
                <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
                <h2 className="text-xl font-light text-gray-500 mb-2">
                    {post.description}
                </h2>
                <div>
                    {post.mainImage && (
                        <img
                            className="h-10 w-10 rounded-full"
                            src={urlFor(post.author.image).url()!}
                            alt=""
                        />
                    )}
                    <p className="font-extralight text-sm">
                        blog post by {""}
                        <span>{post.author.name}</span>published at{" "}
                        {new Date(post._createdAt).toLocaleString()}
                    </p>
                </div>
                <div>
                    <PortableText
                        dataset={process.env.NEXT_PUBLIC_SANTIY_DATASET!}
                        projectId={process.env.NEXT_PUBLIC_SANTIY_PROJECT_ID!}
                        content={post.body}
                        serializers={{
                            h1: ({ porps }: any) => (
                                <h1 className="text-3xl font-bold my-5{...props}"></h1>
                            ),
                            h2: ({ porps }: any) => (
                                <h2 className="text-xl font-bold my-5{...props}" />
                            ),
                            li: ({ children }: any) => (
                                <li className="ml-4 list-disc">{children}</li>
                            ),
                            link: ({ href, children }: any) => (
                                <a href={href} className="text-blue-500 hover:underline">
                                    {children}
                                </a>
                            ),
                        }}
                    />
                </div>

            </article>

            <div className="bg-white">
                <div className="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Technical Specifications
                        </h2>
                        <p className="mt-4 text-gray-500">
                            The walnut wood card tray is precision milled to perfectly fit a
                            stack of Focus cards. The powder coated steel divider separates
                            active cards from new ones, or can be used to archive important
                            task lists.
                        </p>

                        <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                            {features.map((feature) => (
                                <div
                                    key={feature.name}
                                    className="border-t border-gray-200 pt-4"
                                >
                                    <dt className="font-medium text-gray-900">{feature.name}</dt>
                                    <dd className="mt-2 text-sm text-gray-500">
                                        {feature.description}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
                        {post.mainImage2 && (
                            <img
                                className="bg-gray-100 rounded-lg"
                                src={urlFor(post.mainImage2).url()!}
                                alt=""
                            />
                        )}
                        {post.mainImage3 && (
                            <img
                                className="bg-gray-100 rounded-lg"
                                src={urlFor(post.mainImage3).url()!}
                                alt=""
                            />
                        )}

                        {post.mainImage4 && (
                            <img
                                className="bg-gray-100 rounded-lg"
                                src={urlFor(post.mainImage4).url()!}
                                alt=""
                            />
                        )}
                        {post.mainImage5 && (
                            <img
                                className="bg-gray-100 rounded-lg"
                                src={urlFor(post.mainImage5).url()!}
                                alt=""
                            />
                        )}
                    </div>
                </div>
            </div>
            <section>

                <div className=" max-w-7xl carousel my-12   mx-auto">
                    <h2 className="text-3xl ml-5 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Fasilitas terdekat
                    </h2>
                    <div className="relative overflow-hidden">
                        <div className="flex justify-between absolute top left w-full h-full">
                            <button
                                onClick={movePrev}
                                className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
                                disabled={isDisabled('prev')}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-20 -ml-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                                <span className="sr-only">Prev</span>
                            </button>
                            <button
                                onClick={moveNext}
                                className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
                                disabled={isDisabled('next')}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-20 -ml-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                                <span className="sr-only">Next</span>
                            </button>
                        </div>
                        <div
                            ref={carousel}
                            className="carousel-container pr-4 relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
                        >
                            <div className="flex py-7 px-2  pr-4 border-b cursor-pointer  transition duration-200 ease-out first:border-t ">
                                <div className="relative h-24 w-40 pr-5 pl-5 md:h-52 md:w-80 flex-shrink-0 hover:scale-105 transform transition duration-300 ease-out">

                                    {post.fasilitas.image && (
                                        <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlFor(post.fasilitas.image).url()!} alt="" />
                                    )}
                                </div>
                                <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0 hover:scale-105 transform transition duration-300 ease-out">

                                    {post.fasilitas.image1 && (
                                        <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlFor(post.fasilitas.image1).url()!} alt="" />
                                    )}
                                </div>
                                <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0 hover:scale-105 transform transition duration-300 ease-out">

                                    {post.fasilitas.image2 && (
                                        <img className='h-60  pr-5 pl-5 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlFor(post.fasilitas.image2).url()!} alt="" />
                                    )}
                                </div>
                                <div className="relative h-24  w-40 md:h-52 md:w-80 flex-shrink-0 hover:scale-105 transform transition duration-300 ease-out">

                                    {post.fasilitas.image3 && (
                                        <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlFor(post.fasilitas.image3).url()!} alt="" />
                                    )}
                                </div>
                                <div className="relative h-24 w-40 pr-5 pl-5 md:h-52 md:w-80 flex-shrink-0 hover:scale-105 transform transition duration-300 ease-out">

                                    {post.fasilitas.image4 && (
                                        <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlFor(post.fasilitas.image4).url()!} alt="" />
                                    )}
                                </div>
                                <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0 hover:scale-105 transform transition duration-300 ease-out">

                                    {post.fasilitas.image && (
                                        <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlFor(post.fasilitas.image).url()!} alt="" />
                                    )}
                                </div>

                            </div>


                        </div>
                    </div>
                </div>

            </section>



            <section >

                <div className=" max-w-10xl carousel my-12  mx-auto">
                    <h2 className="text-3xl ml-12  mb-5 p-5 mx-auto font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Map
                    </h2>
                    <p className="pt-2 ml-10 mb-5 p-5 mx-auto font-semibold   text-xl text-zinc-800">    <MapIcon className="hidden md:inline-flex h-8 bg-blue-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />{post.alamat}</p>
                    <Map
                        initialViewState={{
                            longitude: post.long,
                            latitude: post.lang,
                            zoom: 11
                        }}
                        style={{ width: '50', height: '50vh' }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken="pk.eyJ1IjoidGVndWhkYXJtYSIsImEiOiJjbDE1dHZzdDYxMjNnM2lzNm8yZDlodHZyIn0.O_M6KW7lAkTVPnq1GE8Mkg">


                    </Map>


                </div>
              



            </section>
           <div>
               <Jumbutron/>
           </div>
            <hr className="max-w-lg my-5 mx-auto border border-green-500" />
            {submitted ? (
                <div className="flex flex-col py-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
                    <h3 className="mx-auto text-3xl mb-4">
                        terima kasih telah memberikan komen
                    </h3>
                    <p className="mx-auto">sudah di terima </p>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
                    action=""
                >
                    <h3 className="text-sm text-green-500">berikan komen untuk rumah ini</h3>
                    <h4 className="text-3xl font-bold">tingalkan komen di bawah</h4>
                    <hr className="py-3 mt-2" />
                    <input
                        {...register("_id")}
                        type="hidden"
                        name="_id"
                        value={post._id}
                    />
                    <label className="block mb-5" htmlFor="">
                        <span className="text-gray-700">Name</span>
                        <input
                            {...register("name", { required: true })}
                            className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring "
                            placeholder="jhon applessed"
                            type="text"
                        />
                    </label>
                    <label className="block mb-5" htmlFor="">
                        <span className="text-gray-700">email</span>
                        <input
                            {...register("email", { required: true })}
                            className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring "
                            placeholder="jhon applessed"
                            type="email"
                        />
                    </label>
                    <label className="block mb-5" htmlFor="">
                        <span className="text-gray-700">comment</span>
                        <textarea
                            {...register("comment", { required: true })}
                            className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring"
                            placeholder="jhon appleseed "
                            rows={9}
                        />
                    </label>
                    {/* error will return when field validation fails */}
                    <div className="flex flex-col p-5">
                        {errors.name && (
                            <span className="text-red-500">the name field is required</span>
                        )}
                        {errors.comment && (
                            <span className="text-red-500">
                                the comment field is required
                            </span>
                        )}
                        {errors.email && (
                            <span className="text-red-500">the email field is required</span>
                        )}
                    </div>

                    <input
                        type="submit"
                        className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
                    />
                </form>
            )}

            {/* comment */}
            <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2">
                <h3 className="text-4xl">Comment</h3>
                <hr className="pb-2" />
                {post.comments.map((data) => (
                    <div key={data._id}>
                        <p>
                            <span className="text-yellow-500">{data.name}</span>:
                            {data.comment}
                            <span className="text-gray-500 ">
                                {" "}
                                published at {new Date(post._createdAt).toLocaleString()}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Post;

export const getStaticPaths = async () => {
    const query = `*[_type == "post"]{
        _id,
        _id,
        _createdAt,
        title,
        author->{
        name,
        image
      },
      'comments': *[
          _type == "comment"&&
          post._ref == ^._id 
          ],
      description,
      mainImage,
      mainImage2,
      mainImage3,
      mainImage4,
      mainImage5,
      fasilitas->{
          image,image1,image2,image3,image4,image5
      },
      long,
      lang,

      
      body,
    
       slug{
           current
       }
      }`;
    const posts = await sanityClient.fetch(query);
    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current,
        },
    }));
    return {
        paths,
        fallback: "blocking",
    };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author->{
        name,
        image
      },
      'comments': *[
          _type == "comment"&&
          post._ref == ^._id 
          ],
      description,
      mainImage,
      mainImage2,
      mainImage3,
      mainImage4,
      mainImage5,
      fasilitas->{
        image,image1,image2,image3,image4,image5
    },
      star,
      price,
      long,
      lang,
      slug,
      body,
      alamat

    }`;
    const post = await sanityClient.fetch(query, {
        slug: params?.slug,
    });
    if (!post) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            post,

        },

        revalidate: 10, // after 60 second , itll update the old cached version
    };
};
