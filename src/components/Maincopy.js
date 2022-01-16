import React , {useState, useEffect} from 'react';
import Dexie from "dexie";
import App2 from './App2';

const Main = () => {
    
    //set the database 
    const db = new Dexie("ReactDexie");
    //create the database store
    db.version(1).stores({
        posts: "title, content, file"
    })
    db.open().catch((err) => {
        console.log(err.stack || err)
    })
    
    //set the state and property
    const [postTitle, setTitle] = useState("");
    const [postContent, setContent] = useState("");
    const [postFile, setFile] = useState("");
    const [posts, setPosts] = useState("");


    //read the file and decode it
    const getFile = (e) => {
        // console.log(e)

        let reader = new FileReader();
        reader.readAsDataURL(e[0]);
        reader.onload= (e) => {
            setFile(reader.result);
        }
    }
  
    const deletePost = async(id) => {
        // console.log(id);
        db.posts.delete(id);
        let allPosts = await db.posts.toArray();
        //set the posts
        setPosts(allPosts);
    }


    //submit 
    const getPostInfo = (e) => {
        e.preventDefault();
        if(postTitle !== "" && postContent !== "" && postFile !== ""){
            let post = {
                title: postTitle,
                content: postContent,
                file: postFile
            }
           
    
            db.posts.add(post).then(async() => {
                //retrieve all posts inside the database
                let allPosts = await db.posts.toArray();
                //set the posts
                setPosts(allPosts);
            });

			// document.getElementById(#ttle).value="";

            
        }
        
        
    }

    useEffect(() => {

        //get all posts from the database
        const getPosts = async() => {
            let allPosts = await db.posts.toArray();
            setPosts(allPosts);
        }
        getPosts();
  
    }, [])



    let postData;
  
  
    if(posts.length > 0) {
      
        postData = <div className="postsContainer">
                    {
                        posts.map(post => {
                         
                             return <div className="post" key={post.title}>
                                        
                                            <h2>{post.title}</h2>
                                            <p>{post.content}</p>
											{/* <button className="delete">Play</button> */}
                                            <button className="delete" onClick={() => deletePost(post.title)}>Delete</button>
                                        </div>       
                        })
                    }
                   </div>
    }else{
        postData = <div className="message">
                     <p>There are no songs to show</p>
                   </div>
    }

    return (
    <React.Fragment>

		<App2 queue={posts} />

        <form onSubmit={getPostInfo}>
           <div className="control">
           <label>Title</label>
            <input type="text" id='ttle' name="title" onChange={e => setTitle(e.target.value)} />
           </div>
           <div className="control">
           <label>Artist</label>
            <textarea name="content" id='sttle'  onChange={e => setContent(e.target.value)} />
           </div>
           <div className="control">
            <label htmlFor="cover" className="cover">Choose a file</label>
            <input type="file" id="cover" name="file"  onChange={e => getFile(e.target.files)} />
           </div>
            
            <input type="submit" value="Submit" />
        </form>
     
        {postData}
      
    </React.Fragment>
  );
}

export default Main;
