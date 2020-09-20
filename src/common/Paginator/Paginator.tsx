import React, {useState} from 'react';
import s from './Paginator.module.css'
import {PagesButton} from "../../components/common/Buttons/Buttons";


type PropsType = {
    totalItemsCount: number
    currentPage?: number
    pageSize: number
    onPageChanged?: (pageNumber: number) => void
    portionSize?: number
}
const Paginator: React.FC<PropsType> = ({
                                            totalItemsCount,
                                            currentPage = 1,
                                            pageSize,
                                            onPageChanged = x => x,
                                            portionSize = 10
}) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    const portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    const onPrevButtonClick = () => {
        setPortionNumber(portionNumber - 1);
    };
    const onNextButtonClick = () => {
        setPortionNumber(portionNumber + 1);
    };

    const usersPage: Array<number> = [];
    for (let i = 1; i < pagesCount+1; i++) usersPage.push(i);
    return <div className={s.usersPages}>
        <PagesButton isVisible={portionNumber>1} name="PREV" callback={onPrevButtonClick}/>
        {usersPage.filter(p => p>=leftPortionPageNumber&&p<=rightPortionPageNumber)
            .map(p => <div key={p}
                onClick={() => {
                    onPageChanged(p)
                }}
               >
                <span className={p === currentPage ? `${s.page} ${s.currentPage}` : s.page}>{p}</span>
            </div>
        )}
        <PagesButton name="NEXT" isVisible={portionNumber<portionCount} callback={onNextButtonClick}/>
    </div>
};


export default Paginator;