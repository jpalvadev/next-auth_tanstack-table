import xlsx, { IJsonSheet, ISettings } from 'json-as-xlsx';
import { people } from './people';

export function downloadToExcel() {
  const columns: IJsonSheet[] = [
    {
      sheet: 'Persons', // nombre de la sheet,
      columns: [
        {
          // label es el encabezado en el excel
          // value debe coincidir con el id que le dimos en la column definition
          label: 'Person ID',
          value: 'id',
        },
        {
          label: 'First Name',
          value: 'first_name',
        },
        {
          label: 'Last Name',
          value: 'last_name',
        },
        {
          label: 'Email',
          value: 'email',
        },
        {
          label: 'Gender',
          value: 'gender',
        },
        {
          // al value lo queremos formatear
          label: 'Date of Birth',
          value: (row) =>
            new Date(row.date_of_birth as string).toLocaleDateString(),
        },
      ],
      content: people,
    },
  ];

  const settings: ISettings = {
    fileName: 'People Excel',
  };

  xlsx(columns, settings);
}
