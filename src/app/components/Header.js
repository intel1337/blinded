import Image from "next/image"
import style from './Header.module.css'

export default function Header(){
    return(
        <header className={style.container}>
            <h1>Blinded</h1>
            <Image
            src="/Vector.png"
            alt="logo"
            width={50}
            height={50}

            
            ></Image>
         </header>
    )
}