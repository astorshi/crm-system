import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "../../redux/actions/clients.action";
import { Link } from "react-router-dom";
import {useState} from "react"

export default function AllClients() {

  
  const {
    values: clients,
    error,
    loading,
  } = useSelector((state) => state.clients);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);
  
  //================== SEARCH
  
  let keyCl = ['surname', 'patronymic', 'email', 'phone', 'address']
  
  function translit(word){
    var answer = '';
    var converter = {
      'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
      'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
      'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
      'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
      'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
      'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
      'э': 'e',    'ю': 'yu',   'я': 'ya',
   
      'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',
      'Е': 'E',    'Ё': 'E',    'Ж': 'Zh',   'З': 'Z',    'И': 'I',
      'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',
      'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',
      'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',
      'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '',     'Ы': 'Y',    'Ъ': '',
      'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya'
    };
   
    for (var i = 0; i < word.length; ++i ) {
      if (converter[word[i]] == undefined){
        answer += word[i];
      } else {
        answer += converter[word[i]];
      }
    }
   
    return answer;
  }
  
  
  let filtredClients = clients
  const [value, setValue] = useState('')
  if(value) { 
    function helpMePlease(item) {  
   for (let i = 0; i < keyCl.length; i++) {
     if (!item.hasOwnProperty(keyCl[i])) item[keyCl[i]] = ''
   }
   if (item.name.toLowerCase().includes(value.toLowerCase().trim())) return true
   if (item.surname.toLowerCase().includes(value.toLowerCase().trim())) return true
   if (item.patronymic.toLowerCase().includes(value.toLowerCase().trim())) return true
   if (item.email.toLowerCase().includes(value.toLowerCase().trim())) return true
   if (item.phone.toLowerCase().includes(value.toLowerCase().trim())) return true

   if (translit(item.name.toLowerCase()).includes(value.toLowerCase().trim())) return true
   if (translit(item.surname.toLowerCase()).includes(value.toLowerCase().trim())) return true
   if (translit(item.patronymic.toLowerCase()).includes(value.toLowerCase().trim())) return true
   if (translit(item.email.toLowerCase()).includes(value.toLowerCase().trim())) return true
   if (translit(item.phone.toLowerCase()).includes(value.toLowerCase().trim())) return true
      }   
    filtredClients = clients.filter(helpMePlease)
    
  }

  const clearInput = () => {
    setValue("");
  };


  return (
    <div>
      <h1>Все клиенты</h1>

      <form onSubmit={() => clearInput()} className="search_form">
      <input
          onChange={(event) => setValue(event.target.value)}
          type="text"
          placeholder="Поиск клиента..."
          className="search_input"
        />
      </form>

      {loading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p>Ошибка базы данных</p>
      ) : (
        <>
          {clients.length === 0 ? (
            <p>Клиентов нет</p>
          ) : (
            <ul>
              {filtredClients?.map((cl) => (
                <Link key={cl._id} to={`/clients/${cl._id}`}>
                <div>
                <h7>
                  {cl.name} {cl.surname} {cl.patronymic} {cl.email} {cl.phone}
                </h7>
                </div>
                </Link>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}



