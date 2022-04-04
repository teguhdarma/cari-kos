import { useState, useRef, useEffect } from 'react';
import { sanityClient, urlFor } from "../sanity"
import { Post } from '../typings'
import Link from 'next/link'
import { HeartIcon, StarIcon } from "@heroicons/react/solid";
import Header from '../components/Header';
import { useRouter } from "next/router";
interface props {
    posts: [Post];
}



// Data


const Tipees = ({ posts }: props) => {
    const Router = useRouter();
    console.log(posts);


    const { title} = Router.query;
  
    

    return (
        <div>

            <Header  />


            <h2 className="text-4xl leading-8 font-semibold mb-12 text-slate-700 mt-4 ml-20">
                Our epic carousel
            </h2>
            <div className="grid grid-cols-3 gap-4 ml-20">
                {posts.map((post) => (
                    <Link key={post._id} href={`/post/${post.slug.current}`}>
                        
                        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="rounded-t-lg w-full h-80" src={urlFor(post.mainImage).url()!} alt="" />
                            </a>
                          
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                                    <p className="pt-2 text-sm text-zinc-800">{post.alamat}</p>
                                    <p className="pt-2 text-sm text-zinc-500">{post.location.title}</p>

                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.description}</p>
                                <a href="#" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Read more
                                    <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </a>
                            </div>
                        </div>

                    </Link>
                ))}
            </div>
        </div>
    );
};


export default Tipees;

export async function getServerSideProps(context) {
    const location =  context.query.title


    //   const url = "https://travel-advisor.p.rapidapi.com/locations/search?query="+location+"&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US"
    //   const select = await fetch(url, {
    // 	"method": "GET",
    // 	"headers": {
    // 		"x-rapidapi-host": "travel-advisor.p.rapidapi.com",
    // 		"x-rapidapi-key": "08f6102a57msh5971be4c6402572p1e116ejsn5966a16c4d29"
    // 	}
    // }).then(
    //     (res) => res.json()
    //   );
    const query = `*[_type == "post" && category->title == $location]{
    _id,
    title,
    author->{
    name,image
  },
  description,
  mainImage,
  mainImage2,
  location->{
      title,description,
  },
  fasilitas->{
    image,image1,image2,image3,image4,image5
},
  slug,
  star,
  price,
  long,
  lang,
  no,
  alamat
  
  
  }`;
    const params = { location: location }
    const posts = await sanityClient.fetch(query, params)


   
    return {
        props: {

          
            posts
        },
    };
}
