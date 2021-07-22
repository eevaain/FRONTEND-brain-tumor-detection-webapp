
export default function Header() {
    return(
        <>
        <div className="pb-16">
            <img src="me.png" className="h-20"/>
            <a className = "flex justify-center font-extrabold text-6xl text-center pb-4 pt-16">Brain Tumor Detection Web App</a>
            <a className = "flex justify-center font-regular text-3xl text-center">Click to select an image or upload your own.</a>
        </div>
        </>
    )
}

