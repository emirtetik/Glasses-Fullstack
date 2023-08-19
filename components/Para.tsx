'use client'
import React,{useEffect,useRef,useState} from 'react'
import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextEditor } from '.'
interface ParaProps{
    setDescribe: React.Dispatch<React.SetStateAction<any>>
    description:string
}

const Para = ({description,setDescribe}: ParaProps) => {

      const [focus,setFocus] = useState<boolean>(false)

    const editor = useEditor({
        extensions: [
          StarterKit,
        ],
        editorProps:{
            attributes:{
            class:'prose w-full focus:outline-none leading-5 prose-a:text-pink-600 prose-a:font-semibold prose-a:no-underline'
            }
        },
        content: description,
      })

      const html = editor?.getHTML()

      useEffect(() => {
         setDescribe(html)
        //  console.log(html);
         
      
      }, [html,setDescribe])
      

      const menuRef = useRef<HTMLDivElement>(null)

      useEffect(() => {
          const handler = (e:any) => {
            if(!menuRef.current?.contains(e.target)){
                setFocus(false)
            }
          }
          document.addEventListener('mousedown',handler)
      },[])

  return (
    <div className={`mx-auto border-[1px] mt-4 rounded-xl ${focus ? 'border-pink-600 ml-0' : ''}`} ref={menuRef}>
        <TextEditor editor={editor}/>
        <EditorContent editor={editor} style={{padding:'18px'}} onClick={() => setFocus(true)}/>
</div>

  )
}

export default Para
