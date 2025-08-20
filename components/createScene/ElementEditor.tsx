// 'use client'
// import React, { useEffect, useRef } from 'react'
// import useForm from '@/hooks/useForm'
// import { Button } from "@/components/ui/button"
// import { setActiveElement } from '@/store/slice/formSlice'
// import { Switch } from '../ui/switch'
// import { Input } from '../ui/input'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Separator } from '../ui/separator'
// import { HeadingElement, InputElement, ParagraphElement, TextAreaElement } from '@/types'


// const ElementEditor = () => {
//   const { form, getSingleElement, discardActiveElement, updateElementProperty, toggleIsRequired } = useForm();
//   const element = getSingleElement(form.activeElement as unknown as string);
//   const editorRef = useRef<HTMLDivElement>(null);


//   const handleChange = (key: string, value: any) => {
//     updateElementProperty({
//       id: element.id,
//       data: { [key]: value }
//     });
//   };

//   const handleToggleRequired = (id) => {
//     toggleIsRequired(id);
//   }


//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (editorRef.current && !editorRef.current.contains(event.target as Node)) {
//         discardActiveElement(); // deselect element
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [discardActiveElement]);

//   const renderEditorFields = () => {
//     if (!element) return null;

//     switch (element.type) {
//       case 'input':
//         return (
//           <>
//             <div className="space-y-4 bg-[#1F1F1F] p-4 rounded-lg shadow-sm border border-[#333] w-full max-w-md">
//               <div>
//                 ✏️ Input Field
//               </div>
//               {/* Label Input */}
//               <div className="flex flex-col space-y-1">
//                 <label className="text-sm font-medium text-gray-300">Field Heading</label>
//                 <input
//                   type="text"
//                   value={(element.data as InputElement).heading}
//                   onChange={(e) => handleChange('heading', e.target.value)}
//                   className="bg-[#2A2A2A] border border-[#444] text-sm text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                   placeholder="Enter field heading"
//                 />
//               </div>

//               {/* Placeholder Input */}
//               <div className="flex flex-col space-y-1">
//                 <label className="text-sm font-medium text-gray-300">Field Placeholder</label>
//                 <input
//                   type="text"
//                   value={(element.data as InputElement).placeholder}
//                   onChange={(e) => handleChange('placeholder', e.target.value)}
//                   className="bg-[#2A2A2A] border border-[#444] text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                   placeholder="Enter placeholder text"
//                 />
//               </div>

//               {/* Required Switch */}
//               <div className="flex items-center justify-between pt-2">
//                 <label className="text-sm font-medium text-gray-300">Is this a required field ??</label>
//                 <Switch
//                   checked={element.required}
//                   onCheckedChange={() => handleToggleRequired(element.id)}
//                   className="bg-gray-600 data-[state=checked]:bg-green-500"
//                 />
//               </div>
//             </div>
//           </>

//         );
//       case 'textarea':
//         return (
//           <div className="space-y-4 bg-[#1F1F1F] p-4 rounded-lg shadow-sm border border-[#333] w-full max-w-md">
//             <div>
//               ✏️ Text Area Field
//             </div>
//             {/* Label Input */}
//             <div className="flex flex-col space-y-1">
//               <label className="text-sm font-medium text-gray-300">Text Area Heading</label>
//               <input
//                 type="text"
//                 value={(element.data as TextAreaElement).heading}
//                 onChange={(e) => handleChange('heading', e.target.value)}
//                 className="bg-[#2A2A2A] border border-[#444] text-sm text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 placeholder="Enter field heading"
//               />
//             </div>

//             {/* Placeholder Input */}
//             <div className="flex flex-col space-y-1">
//               <label className="text-sm font-medium text-gray-300">Placeholder</label>
//               <input
//                 type="text"
//                 value={(element.data as TextAreaElement).placeholder}
//                 onChange={(e) => handleChange('placeholder', e.target.value)}
//                 className="bg-[#2A2A2A] border border-[#444] text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 placeholder="Enter placeholder text"
//               />
//             </div>

//             {/* Required Switch */}
//             <div className="flex items-center justify-between pt-2">
//               <label className="text-sm font-medium text-gray-300">Is this a required field ??</label>
//               <Switch
//                 checked={element.required}
//                 onCheckedChange={() => handleToggleRequired(element.id)}
//                 className="bg-gray-600 data-[state=checked]:bg-green-500"
//               />
//             </div>
//           </div>
//         );
//       case 'heading':
//         return (
//           <div className='flex flex-col gap-2 py-5 h-full'>

//             <input
//               type='text'
//               value={(element.data as HeadingElement).heading}
//               onChange={(e) => handleChange('heading', e.target.value)}
//               className="bg-[#2A2A2A] border border-[#444] text-sm text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               placeholder="Enter field label"
//             />
//             <select
//               value={(element.data as HeadingElement).level || 'h1'}
//               onChange={(e) => handleChange('level', e.target.value)}
//               className='p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-[#2A2A2A] border border-[#444] text-sm text-white'
//             >
//               <option value='h1'>H1</option>
//               <option value='h2'>H2</option>
//               <option value='h3'>H3</option>
//               <option value='h4'>H4</option>
//               <option value='h5'>H5</option>
//               <option value='h6'>H6</option>
//             </select>
//           </div>
//         );
//       case 'paragraph':
//         return (
//           <div className="space-y-4 bg-[#1F1F1F] p-4 rounded-lg shadow-sm border border-[#333] w-full max-w-md h-full">
//             <div>
//               ✏️ Add Paragraph
//             </div>
//             <textarea
//               value={(element.data as ParagraphElement).content}
//               placeholder='Add content'
//               rows={4}
//               onChange={(e) => handleChange('content', e.target.value)}
//               className='border border-[#2E2E2F] outline-no p-2 rounded w-full text-white placeholder:text-sm text-sm outline-none'
//             />
//           </div>
//         );
//       case 'divider':
//         return <p className='text-gray-500'>Divider has no editable fields.</p>;
//       default:
//         return <p className='text-red-500'>Unknown element type.</p>;
//     }
//   };

//   return (
//     <div className='w-full h-full border-l-[1px] border-[#2E2E2E] flex flex-col justify-between p-2 relative bg-[#1D1E21]' ref={editorRef}>
//       {
//         form.activeElement ? (
//           <>
//             <div className='w-full h-full bg-[#1D1E21] text-[#8E8E90] rounded-lg shadow-md flex flex-col gap-4 overflow-y-auto px-3'>
//               <div className='pt-4'>
//                 <h1 className='text-white text-sm font-semibold'>Edit Element</h1>
//                 <p className='text-gray-400 text-xs'>Edit the properties of the selected element.</p>
//               </div>
//               <Separator />
//               <div className='h-full'>
//                 {renderEditorFields()}
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className='w-full h-full bg-[#1D1E21] rounded-lg p-4 shadow-md flex flex-col gap-4 items-center justify-center'>
//             <div>
//               <h1 className='text-white text-sm text-center'>No Active Element</h1>
//               <p className='text-gray-400 text-xs text-center'>Select an element to edit its properties.</p>
//             </div>
//           </div>
//         )
//       }
//     </div>
//   )
// }

// export default ElementEditor
