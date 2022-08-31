import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React from 'react';
import '../App.css';

const modules = {
  toolbar: [
    [{ header: [3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
      { align: [] }
    ],
    ['link']
  ]
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'align',
  'link'
];

export default function QuillEditor({ value, setValue, placeholder }) {
  return (
    <ReactQuill
      value={value}
      onChange={setValue}
      style={{ backgroundColor: 'white' }}
      placeholder={placeholder}
      modules={modules}
      formats={formats}
    />
  );
}
