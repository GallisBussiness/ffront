import {useNavigate} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import data from '../../data/data.json'
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { SearchMedecin } from '../../services/UserService';
import { useMutation } from 'react-query';
let items = data.map((item,i) => ({...item, id: i}));
function Search() {
  
    const navigate = useNavigate();
    const {mutate} = useMutation((text) => SearchMedecin(text), {
      staleTime: 100_000,
      onSuccess:(_) => {
        const i = _.map((item,i) => ({id:items.length + i + 1, KEY: item.name + ' ' + item.speciality, SPECIALITES: item.speciality,isDoc: true,_id:item._id}))
        items = [...items,...i];
      }
    });
    
    const handleOnSelect = (item) => {
       return item.isDoc ? navigate(`/medecin/${item._id}`) : navigate(`/search?q=${item.KEY.toLowerCase()}`)
    };
    const handleOnSearch = (item) => {
     mutate(item);
    }
    return (
        <>
         <div className="mt-10 w-full">
             <div className="flex items-center justify-center w-full">
                   
             <div className="relative flex w-full flex-wrap items-center mb-3">
                     <span className="absolute z-10 h-full leading-snug font-normal text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <SearchIcon className="text-white"/>
                     </span>
                     <div className="flex flex-col w-full">
                     <ReactSearchAutocomplete 
                            items={items}
                          onSearch={handleOnSearch}
                        
            // onHover={handleOnHover}
              onSelect={handleOnSelect}
              inputDebounce={500}
            // onFocus={handleOnFocus}
            // onClear={handleOnClear}
            styling={{ zIndex: 2 }} // To display it on top of the search box below
            autoFocus
            fuseOptions={{ keys: ["KEY","SPECIALITES"] }}
            resultStringKeyName="KEY"
            placeholder="Rechercher une spécialité,nom,lieu..."
          />
                     </div>
                   
                </div>
             </div>

         </div>
           
        </>
    )
}

export default Search
