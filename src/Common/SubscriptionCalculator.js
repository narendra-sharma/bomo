import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { get_plans } from "../reduxdata/rootAction";
import imageLogo from '../images/bomo-dark-green.svg';
import logoImage from '../images/bomo-light-green.svg';
import { format } from "date-fns";
const SubscriptionSteps = (props) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(props.user);
    const [firstPrice, setFirstPrice] = useState(250);
    const [secPrice, setSecPrice] = useState(220);
    const [thirdPrice, setThirdPrice] = useState(200);
    const [firstUpTo, setFirstUpTo] = useState(5);
    const [secUpTo, setSecUpTo] = useState(10);
    const [pieces, setPieces] = useState(firstUpTo);
    const [prize, setPrize] = useState(firstPrice);
    const [save, setSave] = useState(0);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        setUser(props.user);
        const tpieces = props?.user?.subscription?.quantity || firstUpTo;
        const lpieces = (tpieces > secUpTo) ? tpieces - secUpTo : 0;
        const spieces = (lpieces > 0) ? firstUpTo : ((tpieces > firstUpTo) && (tpieces < (secUpTo + 1))) ? tpieces - firstUpTo : 0;
        const fpieces = (spieces > 0) ? firstUpTo : (tpieces <= firstUpTo) ? tpieces : 0;
        const price = ((fpieces * firstPrice) + (spieces * secPrice) + (lpieces * thirdPrice)) || firstPrice;
        const saved = ((spieces * (firstPrice - secPrice)) + (lpieces * (firstPrice - thirdPrice))) || 0;
        setPieces(tpieces);
        setPrize(price);
        setSave(saved);
        setTotal(price);
        if(props.isSubscribe){
            props.change({pieces:tpieces,price:price,saved:saved});
        }
    }, [props.user])
    useEffect(() => {
        get_plans(dispatch);
    }, [])
    useEffect(() => {
        if (props.plans?.length > 0) {
            setFirstPrice(props.plans[0]?.unit_amount / 100);
            setSecPrice(props.plans[1]?.unit_amount / 100);
            setThirdPrice(props.plans[2]?.unit_amount / 100);
            setFirstUpTo(props.plans[0]?.up_to);
            setSecUpTo(props.plans[1]?.up_to);
        }
    }, [props.plans])
    const decrease = () => {
        const tpieces = pieces - 1;
        const price = ((tpieces > firstUpTo) && (tpieces < secUpTo)) ? (prize - secPrice) : ((tpieces >= secUpTo) ? (prize - thirdPrice) : (tpieces * firstPrice));
        const saved = ((tpieces > firstUpTo) && (tpieces < secUpTo)) ? (save - (firstPrice - secPrice)) : (tpieces >= secUpTo) ? (save - (firstPrice - thirdPrice)) : 0;
        setPieces(tpieces);
        setPrize(price);
        setSave(saved);
        if(props.isSubscribe){
            props.change({pieces:tpieces,price:price,saved:saved});
        }
    }
    const increase = () => {
        const tpieces = pieces + 1
        const price = ((tpieces > firstUpTo) && (tpieces < (secUpTo + 1))) ? (prize + secPrice) : (tpieces > secUpTo) ? prize + thirdPrice : tpieces * firstPrice;
        const saved = ((tpieces > firstUpTo) && (tpieces < (secUpTo + 1))) ? (save + firstPrice - secPrice) : (tpieces > secUpTo) ? (save + firstPrice - thirdPrice) : 0;
        setPieces(tpieces);
        setPrize(price);
        setSave(saved);
        if(props.isSubscribe){
            props.change({pieces:tpieces,price:price,saved:saved});
        }
    }
    return (
        <div className={props.isSubscribe?'':'container bg-transparent calculator-screen pt-4'}>
            <h2 className="text-center">
                {user?.plan_id ? user?.quantity===0?'Need more':'Modify your' : 'Start using'} 
                <span className="subscription-heading">
                    {user?.plan_id ? 
                      user?.quantity===0? ' Pieces before '+format(new Date(user?.next_billing_date), 'MMM dd')+'?'
                    :' Subscription' 
                    : <img src={props.isSubscribe?imageLogo:logoImage} alt="Bomo logo" />
                    }
                </span> 
            </h2>
            <p className="sub-heading text-center  mt-3">
                {user?.plan_id ? 
                user?.quantity===0?<>
                  You finished the <b>{user?.subscription?.quantity}</b> pieces included in your plan.
                  <br />Update your subscription to continue making requests today.
                </>
                :<>
                  Your current plan includes <b>{user?.subscription?.quantity}</b> pieces per month. Need to change it for next period?
                </>
                    : <>
                        Choose the number of Pieces you want to create monthly.
                        <br />Need more? You can modify it next month
                    </>
                }
            </p>
            <div className="py-3 px-2 px-md-4">
                <div className="subscription-data mb-0 row align-items-center w-secUpTo0">
                    <div className=" offset-md-4 col-md-4 d-flex justify-content-center align-items-center">
                        <span className="increament-content position-relative">
                            <span className={`increament plus-increment ${(pieces > firstUpTo) && 'cursor-pointer'}`} onClick={() => (pieces > firstUpTo) && decrease()}>-</span>
                            <span className="subscription-count">{pieces}</span>
                            <span className="increament decrease cursor-pointer g-0" onClick={() => increase()}> +</span>
                        </span>
                    </div>
                    <div className={user?.plan_id ? 'col-md-2 modify-subscription-saving g-0' : 'col-md-4 g-0'}>
                        {!user?.plan_id && <>
                            <div className="savings saving-bg-color rounded py-1 g-0 mb-1">Order up to <u>{pieces}</u> items in one bulk request, or split them as needed</div>
                            <div className="savings rounded py-1 g-0 mb-1">Unlimited Revisions. <u>{Math.ceil(pieces / firstUpTo)}</u> at a time with your current Plan</div>
                        </>}
                        {(save > 0) && <div className="savings rounded mt-2 mt-md-0 py-1 g-0">You are saving <u className={user?.plan_id ? 'text-decoration-none' : ''}>${save}</u></div>}
                    </div>
                </div>

                <div className={user?.plan_id ? 'modify-subscription-total setting-subscription-total text-center mb-1' : 'setting-subscription-total text-center mb-1'}>
                    <span className="dark-green "> <span className={user?.plan_id ? 'fw-medium' : 'fw-bold'}>{user?.plan_id ? 'New total' : 'Total'} </span> </span><span className="light-green">$ {prize}</span>
                </div>
                {user?.plan_id && <p className="text-mute text-center">Before $ <span className="font-public">{total}</span></p>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        plans: state.plan.plans
    };
};
export default connect(mapStateToProps)(SubscriptionSteps);
