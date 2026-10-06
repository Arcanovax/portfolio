import Map from "./map.tsx";
import Commits from './commits.tsx';

export default function Board() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date);

    return (
    <div className="grid grid-cols-4 grid-rows-1 round">
        <div>
            Currently Based In
            <Map/>
            Lyon - France {formattedDate}
        </div>
        <div><Commits/></div>
        <div>8</div>
        <div>9</div>
    </div>
)}
