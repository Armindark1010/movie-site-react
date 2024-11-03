import React from 'react'
import {
    Modal,
    Ripple,
    initTWE,
} from "tw-elements";
import { useEffect } from 'react';
import $ from 'jquery'

export const Imgbox = ({url}) => {
    const modal_btn = (url) => {
        $("#modal_img").attr('src', url);
        $("#download").attr('href', url);
    };
    useEffect(() => {
        initTWE({ Modal, Ripple });
      }, []);
  return (
      <div className='h-full w-full'>
          {url && (
                <button
                    onClick={() => modal_btn(url)}
                    type="button"
                    className='cursor-pointer h-full w-full'
                    data-twe-toggle="modal"
                    data-twe-target="#exampleModal"
                    data-twe-ripple-init
                    data-twe-ripple-color="light">
                    <img className='h-full w-full' src={url} alt="thumbnail" />
                </button>
            )}
          
    </div>
  )
}
