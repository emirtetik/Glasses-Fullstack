import React from 'react'
import {Editor} from '@tiptap/react'

type Props = {
    editor: Editor | null
}
const TextEditor = ({editor}: Props) => {
  return (
    <div>
       <div className="mt-6 border-[1px] rounded-lg ">
        <div className='flex item-center justify-center'>
            <button type='button' onClick={() => editor?.chain().focus().toggleBold().run()}
                 disabled={!editor?.can().chain().focus().toggleBold().run()}  
                 className={editor?.isActive('bold') ? 'bg-gray-900 text-white p-3': 'bg-gray-100 text-gray-900'}
            >
        Bold
            </button>
        </div>
       </div>
    </div>
  )
}

export default TextEditor
