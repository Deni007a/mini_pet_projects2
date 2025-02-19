import {useState} from 'react';
import PieChart from './components/PieChart.jsx';
import BarChart from "./components/BarChart.jsx";
import Modal from './components/ModalError.jsx'

const App = () => {
  // для ввода сырых данных с инпута
  const [dataInput, setDataInput] = useState('');
  // для ввода сырых данных с инпута
  const [descriptionInput, setDescriptionInput] = useState('');

  // для обработанных данных как []
  const [data, setData] = useState([]);
  // для обработанного описания как []
  const [descriptions, setDescriptions] = useState([]);

  //  модальное окно с уведомлением об ошибке
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleDataInputChange = (e) => {
    setDataInput(e.target.value);
  };

  const handleDescriptionInputChange = (e) => {
    setDescriptionInput(e.target.value);
  };

  // сброс данных
  const handleReset = () => {
    setData([]);
    setDescriptions([]);
  };

  /**
   * разбивает вводимые данные на []
   */
  const handleSubmit = () => {
    try {
      // Проверяем валидность данных
      const newData = dataInput.split(',').map((item) => {
        const number = Number(item);
        if (isNaN(number)) {
          throw new Error('Введенные данные не являются числом');
        }
        return number;
      });

      // Если данные валидны, продолжаем обработку
      setData([]);
      setDescriptions([]);

      setTimeout(() => {
        setData(newData);
        const newDescriptions = descriptionInput.split(',').map(desc => desc.trim());
        setDescriptions(newDescriptions);

        // Очищаем инпуты
        setDataInput('');
        setDescriptionInput('');
      }, 0);
    } catch (error) {
      // Устанавливаем сообщение ошибки и открываем модальное окно
      setModalMessage('Ошибка: Введенные данные должны быть числами, разделенными запятыми.');
      setIsModalOpen(true);
    }
  };

  // функция для закрытия модального окна
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  return (
    <main className='container content'>
      <div className="App">
        <h1>Динамическая Диаграмма</h1>
        <div>
          <input
            type="text"
            placeholder="Введите данные (числа), разделенные запятыми"
            value={dataInput}
            onChange={handleDataInputChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Введите описания данных (строка), разделенные через запятую"
            value={descriptionInput}
            onChange={handleDescriptionInputChange}
          />
        </div>
        <div>
          <button className="btn myBtn" onClick={handleSubmit}>Построить диаграммы</button>
          <button className="btn myBtn" onClick={handleReset}>Сбросить</button>
        </div>
        {data.length > 0 && (
          <div className="diagrams">
            <BarChart data={data} descriptions={descriptions}/>
            <PieChart data={data} descriptions={descriptions}/>
          </div>
        )}
        {isModalOpen && (
          <Modal message={modalMessage} onClose={handleCloseModal} />
        )}
      </div>
    </main>
  );
};

export default App;