import { MenuItem } from '../core/navigation/menu-item.interface';

export const MENU_ITEMS: MenuItem[] = [
    {
        link: 'draft',
        label: 'Draft Overview',
        children: [
            // 01.
            {
                link: 'draft-01',
                label: 'Draft 01'
            },
            {
                link: 'draft-02',
                label: 'Draft 02'
            }
        ]
    }
];
