import React from 'react'
import {RiTwitterXLine, RiFacebookFill, RiGithubFill, RiInstagramFill } from 'react-icons/ri'

const Footer = () => {
  return (
    <div className='mt-32'>
    <div className="icons text-sm flex justify-center items-center gap-3">
            <a href='https://twitter.com/nilaacodes'><RiTwitterXLine size={30}/></a>
            <a href=''><RiFacebookFill size={30}/></a>
            <a href='https://github.com/nilaachandra'><RiGithubFill size={30}/></a>
            <a href='https://www.instagram.com/niillaaa.a/'><RiInstagramFill size={30}/></a>
        </div>
        <div className="tags flex items-center flex-col text-sm">
          <h1 className='text-center'><span>©️2024</span> <span className=''>GifsByNilaa || All Rights Reserved</span> </h1>
          <p className='text-center'>Developed with &#9829; Nilaa Laishram</p>
          <p className='text-center'>Wanna Support Me? <a href='https://buymeacoffee.com/nilaacodes' className='yellowtext'>Buy me a Coffee to support my Work!</a></p>
        </div>
        </div>
  )
}

export default Footer