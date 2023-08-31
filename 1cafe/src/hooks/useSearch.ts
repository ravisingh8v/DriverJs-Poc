// Search Hook 
/**
 * 
 * @param data Getting parameter
 * @param searchTerm getting search input
 * @returns returning searched item
 */
export default function useSearch(data: any, searchTerm: any, searchField?: any) {

    const item = data?.value.filter(
        (res: any) =>
            res.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return { item }
}