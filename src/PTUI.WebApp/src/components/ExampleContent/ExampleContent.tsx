import React, {ChangeEventHandler, useEffect, useState} from 'react';
import forest1 from '../../assets/images/example/forest-1.jpg'
import mountains1 from '../../assets/images/example/mountains-1.jpg'
import road1 from '../../assets/images/example/road-1.jpg'
import sunset1 from '../../assets/images/example/sunset-1.jpg'

import ContentPage from '../ContentPage/ContentPage'
import Example from "../Example/Example";

import {FieldValues, useForm} from "react-hook-form";
import Editor from "../Editor/Editor";
import UserInterfaceHelpers from "../../helpers/UserInterfaceHelpers";
import {useAppSelector} from "../../hooks/hooks";

function ExampleContent() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSelector, setPageSelector] = useState('numbers');
    const { preferenceType } = useAppSelector((state) => state.user);
    const { register, handleSubmit, formState: { errors } } = useForm();
    let maxPagesNumber: number = 4;

    useEffect(() => {
        (document.getElementById('changePageRadio' + currentPage) as HTMLInputElement).checked = true;
        (document.getElementById('pageSelectorDropdown') as HTMLSelectElement)
            .selectedIndex = currentPage - 1;
    }, [currentPage])
    
    useEffect(() => {
        const asyncWrapper = async () => {
            let pageSelectorType = await UserInterfaceHelpers.getComponentPreference(UserInterfaceHelpers.getUserId(), 'pageSelector',preferenceType);
            if (pageSelectorType !== pageSelector) {
                setPageSelector(pageSelectorType);
            }
        }
        asyncWrapper()
    })

    const changePage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const nextPage = () => {
        if (currentPage < maxPagesNumber) {
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
                changePage(1);
                break;
            case '2':
            case 'two':
            case 'second':
                changePage(2);
                break;
            case '3':
            case 'three':
            case 'third':
                changePage(3);
                break;
            case '4':
            case 'four':
            case 'fourth':
                changePage(3);
                break;
            case 'previous':
                previousPage();
                break;
            case 'next':
                nextPage();
                break;
            case 'last':
                changePage(maxPagesNumber);
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
                return <Example/>
            case 3:
                return <ContentPage/>
            case 4:
                return <Editor/>
            default:
                return <ContentPage/>
        }
    }
    
    return(
        <div>

            {(pageSelector === 'numbers'.toLowerCase())
                ?
                <div>
                {Array.from(Array(maxPagesNumber).keys()).map(x => ++x).map(pageNumber => {
                        return (<button onClick={() => changePage(pageNumber)}>Page {pageNumber}</button>)
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

            {(pageSelector === 'commandLine'.toLowerCase())
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
            
            
            <div>
                <select onChange={() => changePageDropDown()} id={"pageSelectorDropdown"}>
                    {Array.from(Array(maxPagesNumber).keys()).map(x => ++x).map(item => {
                        return (<option key={item} value={item}>{item}</option> )
                    })}
                </select>
            </div>
            
            <div>
                <form>
                    <label htmlFor={'changePageRadio1'}>
                        <input id={'changePageRadio1'} name={'changePageRadio'} type={"radio"} value={1} 
                               onClick={() => changePage(1)}/>
                        Page 1
                    </label>
                    <label htmlFor={'changePageRadio2'}>
                        <input id={'changePageRadio2'} name={'changePageRadio'} type={"radio"} value={2} 
                               onClick={() => changePage(2)}/>
                        Page 2
                    </label>
                    <label htmlFor={'changePageRadio3'}>
                        <input id={'changePageRadio3'} name={'changePageRadio'} type={"radio"} value={3} 
                               onClick={() => changePage(3)}/>
                        Page 3
                    </label>
                    <label htmlFor={'changePageRadio4'}>
                        <input id={'changePageRadio4'} name={'changePageRadio'} type={"radio"} value={4}
                               onClick={() => changePage(4)}/>
                        Page 4
                    </label>
                </form>
            </div>
            {renderContentPage()}
        </div>
    );
}

export default ExampleContent;