import { useState, useRef, useEffect } from 'react';
import { sanityClient, urlFor } from "../../sanity"
import { Post } from '../../typings'
import Link from 'next/link'
import { HeartIcon, StarIcon } from "@heroicons/react/solid";
import Header from '../../components/Header';
import { useRouter } from "next/router";

interface props {
    posts: [Post];
}



// Data


function Type({ posts }: props) {



    



    

    return (
        <div>

            <Header />


            <h2 className="text-4xl leading-8 font-semibold mb-12 text-slate-700 mt-4 ml-20">
                Category
            </h2>
            <div className="grid grid-cols-3 gap-4 ml-20">
                {posts.map((post) => (
                    <div key={post.title} >
                        <div className="grid grid-cols-3 gap-4 flex posts-center">
                            <div className="mb-4">
                                <ul>
                                  
                                        <li key={post.title}>
                                            <Link href={`/${post.title}`}>
                                            <h3 className="text-4xl leading-8 font-semibold mb-12 text-slate-700 mt-4 ml-20">
                {post.title}
            </h3>
                                            </Link>
                                        </li>
                                
                                </ul>




                                <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0 hover:scale-105 transform transition duration-300 ease-out">

                                    {post.image && (
                                        <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlFor(post.image).url()!} alt="" />
                                    )}
                                </div>
                            </div>



                        </div>

                    </div>
                ))}
            </div>
        </div >
    );
};


export default Type;

export async function getServerSideProps() {


    const query = `*[_type =="category" ]{
        title,
        image
  }`

    const posts = await sanityClient.fetch(query)
    return {
        props: {


            posts
        },
    };
}
