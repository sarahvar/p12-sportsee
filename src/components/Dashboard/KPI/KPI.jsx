import './KPI.css'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getData } from '../../../service/dataSwitch';
import { USER_MAIN_DATA } from '../../../mocks/data/informations';
import { getUserScore } from '../../../api/call';

const KeyPerformanceIndice = () => {
  const { id } = useParams();
  const [score, setScore] = useState([]);

  useEffect(() => {

    // const useMockData = import.meta.env.REACT_APP_USE_MOCK_DATA === 'true';
    const dataChoice = getData();

    if(dataChoice === 'mocked') {
    // Données formatées pour les données mockées
    const selectedUser = USER_MAIN_DATA.find(user => user.id == id);
  
  
      if (!selectedUser) {
        return <div>Utilisateur non trouvé</div>;
      }
    
      const { firstName, lastName } = selectedUser.userInfos;
      const { todayScore, score } = selectedUser;
    
      const data = [
        { name: `${firstName} ${lastName}`, value: todayScore || score},
        { name: 'Autres', value: 1 - (todayScore || score) } // Calcul du score restant
      ];
      setScore(data)

    } else if (dataChoice === 'api') { 
    getUserScore(id)
    .then((data) => {
      setScore(data)
    })
    .catch((error) => {
      console.log('An error occurred:', error)
      });
    }
  }, [id, ]);
  
  if(!score || score.length === 0) {
    return <div>Aucun utilisateur trouvé</div>
  }


  return (
    <div className='container-keyPerformanceIndice'>
      <h3 className='container-keyPerformanceIndice__title-score'>Score</h3>
      <ResponsiveContainer width='100%' height='70%'>
        <PieChart>
          <Pie
            dataKey='value'
            isAnimationActive={true}
            data={score}
            outerRadius={85}
            innerRadius={75}
            cornerRadius={10}
            startAngle={90} // Start drawing from the bottom
          >
            {score.map((ele, index) => 
              index === 0 ? (<Cell key={`cell-${index}`} fill='#ff0000' />) :
                            (<Cell key={`cell-${ele}`} fill='#fbfbfb' />)
            )}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className='container-keyPerformanceIndice__score-container'>
        <span className='container-keyPerformanceIndice__score-container__score'>
          {score[0].value * 100}% <br />
        </span>
        <span className='container-keyPerformanceIndice__score-container__text'>de votre </span><br/>
        <span className='container-keyPerformanceIndice__score-container__text'>objectif</span>
      </div>
    </div>
  );
};

export default KeyPerformanceIndice;
