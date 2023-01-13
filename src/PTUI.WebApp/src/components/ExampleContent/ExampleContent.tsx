import React, {ChangeEventHandler, useEffect, useState} from 'react';

import ContentPage from '../ContentPage/ContentPage'
import Example from "../Example/Example";

import {FieldValues, useForm} from "react-hook-form";
import Editor from "../Editor/Editor";
import UserInterfaceHelpers from "../../helpers/UserInterfaceHelpers";
import {useAppSelector} from "../../hooks/hooks";
import ContentPage2 from "../ContentPage2/ContentPage2";

function ExampleContent() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSelector, setPageSelector] = useState('numbers');
    const [maxPages, setMaxPage] = useState(3);
    const { preferenceType } = useAppSelector((state) => state.user);
    const { userName, userToken } = useAppSelector((state) => state.user)
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        if (document.getElementById('changePageRadio' + currentPage)) {
            (document.getElementById('changePageRadio' + currentPage) as HTMLInputElement).checked = true;
        }
        if (document.getElementById('pageSelectorDropdown')) {
            (document.getElementById('pageSelectorDropdown') as HTMLSelectElement)
                .selectedIndex = currentPage - 1;
        }
    }, [currentPage])
    
    useEffect(() => {
        const asyncWrapper = async () => {
            let pageSelectorType = 'numbers';
            if (!userToken && localStorage.getItem('token')) {
                pageSelectorType = await UserInterfaceHelpers.getComponentPreference(UserInterfaceHelpers.getUserId(), 'pageSelector',preferenceType);
            }
            
            if (pageSelectorType !== pageSelector) {
                setPageSelector(pageSelectorType);
            }
        }
        asyncWrapper();
    })

    const nextPage = () => {
        if (currentPage < maxPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);    
        }
    }

    const changePageDropDown = () => {
        let pageNumber = (document.getElementById("pageSelectorDropdown") as HTMLInputElement)?.value ?? "1";
        setCurrentPage(Number(pageNumber));
    }

    const submitConsoleForm = (formData: FieldValues) => {
        let input: string = formData.consoleInput;
        switch (input) {
            case '1':
            case 'one':
            case 'first':
                setCurrentPage(1);
                break;
            case '2':
            case 'two':
            case 'second':
                setCurrentPage(2);
                break;
            case '3':
            case 'three':
            case 'third':
                setCurrentPage(3);
                break;
            case '4':
            case 'four':
            case 'fourth':
                setCurrentPage(3);
                break;
            case 'previous':
                previousPage();
                break;
            case 'next':
                nextPage();
                break;
            case 'last':
                setCurrentPage(maxPages);
                break;
            default:
                // TODO: Invalid input
                break;
        }
    }

    const renderContentPage = () => {
        switch (currentPage) {
            case 1:
                return <ContentPage/>
            case 2:
                return <ContentPage2/>
            case 3:
                return <Example/>
            // case 4:
            //     return <Editor/>
            default:
                return <ContentPage/>
        }
    }
    
    return(
        <div>

            {(pageSelector === 'numbers'.toLowerCase())
                ?
                <div>
                {Array.from(Array(maxPages).keys()).map(x => ++x).map(pageNumber => {
                        return (<button onClick={() => setCurrentPage(pageNumber)}>Page {pageNumber}</button>)
                    })}
                </div>
                :
                <></>
            }

            {(pageSelector === 'arrows'.toLowerCase())
                ?
                <div>
                    <button onClick={() => previousPage()}>Previous</button>
                    <button onClick={() => nextPage()}>Next</button>
                </div>
                :
                <></>
            }

            {(pageSelector === 'command-line'.toLowerCase())
                ?
                <div>
                    <form onSubmit={handleSubmit(submitConsoleForm)}>
                        <input type={'text'} {...register('consoleInput')}></input>
                        <button>Submit</button>
                    </form>
                </div>
                :
                <></>
            }

            {(pageSelector === 'dropdown'.toLowerCase())
                ?
                <div>
                    <select onChange={() => changePageDropDown()} id={"pageSelectorDropdown"}>
                        {Array.from(Array(maxPages).keys()).map(x => ++x).map(item => {
                            return (<option key={item} value={item}>{item}</option> )
                        })}
                    </select>
                </div>
                :
                <></>
            }

            {(pageSelector === 'radio'.toLowerCase())
                ?
                <div>
                    <form>
                        <label htmlFor={'changePageRadio1'}>
                            <input id={'changePageRadio1'} name={'changePageRadio'} type={"radio"} value={1}
                                   onClick={() => setCurrentPage(1)}/>
                            Page 1
                        </label>
                        <label htmlFor={'changePageRadio2'}>
                            <input id={'changePageRadio2'} name={'changePageRadio'} type={"radio"} value={2}
                                   onClick={() => setCurrentPage(2)}/>
                            Page 2
                        </label>
                        <label htmlFor={'changePageRadio3'}>
                            <input id={'changePageRadio3'} name={'changePageRadio'} type={"radio"} value={3}
                                   onClick={() => setCurrentPage(3)}/>
                            Page 3
                        </label>
                        <label htmlFor={'changePageRadio4'}>
                            <input id={'changePageRadio4'} name={'changePageRadio'} type={"radio"} value={4}
                                   onClick={() => setCurrentPage(4)}/>
                            Page 4
                        </label>
                    </form>
                </div>
                :
                <></>
            }
            
            {renderContentPage()}
        </div>
    );
}

export default ExampleContent;