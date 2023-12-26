
import { Link } from "react-router-dom";
import "./side.module.css"
export default function SideMenu({ sidebar, setSidebar }) {
   const hideSidebar = () => {
      setSidebar(!sidebar);
   };
   return (
      <>
         <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-row justify-between items-center">
               <button onClick={hideSidebar} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  <span className="sr-only">Close menu</span>
               </button>
               <div className="py-4 overflow-y-auto">
                  <ul className="space-y-2 font-medium">
                     <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                           <span className="ms-3">Dashboard</span>
                        </a>
                     </li>
                  </ul>
               </div>

            </div>
         </div>
      </>
   );
}

