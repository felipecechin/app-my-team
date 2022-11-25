import { FaRegWindowClose } from 'react-icons/fa'
import classNames from '@/utils/classNames'

interface IButtonRemoveProps {
    onClick: () => void
    label: string | number
}

function ButtonRemove({ onClick, label }: IButtonRemoveProps): JSX.Element {
    return (
        <button
            className={classNames(
                'flex flex-row mt-2 sm:mt-0 sm:ml-2 text-emerald-800 font-bold items-center px-4 py-2 border border-emerald-800 shadow-lg shadow-emerald-200 bg-green-50 rounded-lg',
                'hover:shadow-emerald-300 hover:bg-green-100 hover:cursor-pointer'
            )}
            data-testid='testbuttonremove'
            onClick={onClick}
        >
            {label}
            <FaRegWindowClose className='ml-2' />
        </button>
    )
}

export default ButtonRemove
