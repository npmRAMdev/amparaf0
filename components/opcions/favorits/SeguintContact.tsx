
import { getAllBotiguesAction } from '@/actions/botigues/get-all-botigues-action'
import {SeguintContactCard} from '@/components/opcions/favorits/SeguintContactCard'


export const SeguintContact: React.FC = async () => {

  const {botigues} = await getAllBotiguesAction()
  //console.log('botigues SeguintContact', botigues)

  return (
    <div className="mb-36 w-full">      
      {botigues && botigues.map((botiga) => (
        <SeguintContactCard
            key={botiga.id}
            id={botiga.id}
            contactImage={botiga.contactImage }
            name={botiga.name }
            contactName={botiga.contactName}
            color1={botiga.color1}
            color2={botiga.color2}  
        />
      ))}
    </div>
  );
};