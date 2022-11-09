import { heroes } from '../data/heroes'

export const getHeroByName = (name = '') => {
    name = name.toLowerCase().trim();
    if (name.length === 0) return [];
    
    return heroes.filter(h => h.superhero.toLowerCase().includes(name));
    
}
