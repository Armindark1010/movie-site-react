import React from 'react';
import AppRoutes from './router/index';
import { Provider } from 'react-redux';
import { Navbar } from './components/Navbar';
import store from './store/store';

function App() {
  return (

    <Provider store={store}>
                <div
                  data-twe-modal-init
                  class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none backdrop-blur-[30px]"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true">
                  <div
                    data-twe-modal-dialog-ref
                    class="pointer-events-none relative w-11/12 h-[90%] mx-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7">
                    <div
                      class="pointer-events-auto text-red-500 relative flex h-full flex-col w-full rounded-md border-none bg-white/20 backdrop-blur-[50px] bg-clip-padding text-current shadow-4 outline-none dark:bg-surface-dark">
                      <div
              class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10">
              <a href="" id="download" download >
<button
  type="button"
  data-te-ripple-init
  data-te-ripple-color="light"
  class="flex items-center rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    class="mr-1 h-4 w-4">
    <path
      fill-rule="evenodd"
      d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z"
      clip-rule="evenodd" />
  </svg>
  download img
</button>
      </a>
                        <button
                          type="button"
                          class="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                          data-twe-modal-dismiss
                          aria-label="Close">
                          <span class="[&>svg]:h-6 [&>svg]:w-6">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor">
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
              </button>
              
                      </div>
                                    {/* <!-- Modal body --> */}
                      <div  class="relative flex-auto h-5/6 flex justify-center items-center" data-twe-modal-body-ref>
                      <img id='modal_img' className='h-4/5 w-auto ' src='' alt="" />
                      </div>
            </div>
            </div>
                      </div>
            
      <Navbar />
      <AppRoutes />
    </Provider>


  );
}

export default App;
