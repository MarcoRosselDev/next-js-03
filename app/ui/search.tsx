'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  useSearchParams,
  usePathname,
  useRouter
} from 'next/navigation';
// eliminar la funcion rebote para no realizar tantas consultas al db
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // useDebouncedCallback(a, b) a = funcion a realizar, b = tiempo en milisegundos despues de que deja de escribir
  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
   
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 2000);

  /* function handleInput(term:string) {
    // URLSearchParamsEs una API web que proporciona métodos de utilidad 
    // para manipular los parámetros de consulta de URL. 
    // En lugar de crear una cadena literal compleja, 
    // puede usarla para obtener la cadena de parámetros como ?page=1&query=a.
    const params = new URLSearchParams(searchParams);    

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
    console.log(term, pathname);
  } */
  
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={e => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
