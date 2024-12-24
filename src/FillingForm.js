import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import AddressAutocomplete from './AddressAutocomplete';
import ShowMarkerInTheMap from './ShowMarkerInTheMap';
import styles from './FillingForm.module.css'; // ייבוא ה-CSS המודולרי

export default function SearchOfficeForm() {
    const [location, setLocation] = useState(null); 
    const [addressQuery, setAddressQuery] = useState(''); 
    const {
        register,
        handleSubmit,
        setValue,
        watch, // מעקב אחר ערכים
        formState: { errors },
    } = useForm({
        defaultValues: {
            internet: false,
            kitchen: false,
            coffeeMachine: false,
            status: "מחפש", // אתחול ברירת מחדל לשדה הסטטוס
        },
    });

    const save = async (data) => {
        try {
            console.log("Form Data Submitted:", { ...data, address: addressQuery });
            alert("Form Submitted Successfully!");
        } catch (err) {
            console.error("Submission failed:", err);
            alert("Error submitting the form.");
        }
    };

    const handleLocationSelect = (coords) => {
        setLocation(coords); // עדכון המיקום
        setValue('address', coords.display_name || ""); // עדכון הטופס
        setAddressQuery(coords.display_name || ""); // עדכון הערך בשדה הכתובת
    };

    const handleAddressFieldFocus = () => {
        setAddressQuery(''); // ריקון הערך בשדה הכתובת
        setLocation(null); // איפוס המיקום
    };

    return (
        <div className={styles.cardContainer}>
            <Card className={styles.formCard}>
                <form onSubmit={handleSubmit(save)} noValidate>
                    {/* שם משתמש */}
                    <div className={styles.inputGroup}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText
                            className={styles.inputField}
                            placeholder="שם משתמש"
                            type="text"
                            {...register("username", { required: { value: true, message: "שדה חובה" } })}
                        />
                    </div>
                    {errors.username && <small style={{ color: "red" }}>{errors.username.message}</small>}

                    {/* כתובת */}
                    <AddressAutocomplete onLocationSelect={handleLocationSelect} query={addressQuery} setQuery={setAddressQuery} />
                 
                    <InputText
                        type="hidden" // שדה מוסתר שמכיל את הכתובת הנבחרת
                        {...register("address", { required: { value: true, message: "שדה חובה" } })}
                    />
                    {errors.address && <small style={{ color: "red" }}>{errors.address.message}</small>}

                    {/* טלפון */}
                    <div className={styles.inputGroup}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-phone"></i>
                        </span>
                        <InputText
                            className={styles.inputField}
                            placeholder="טלפון"
                            type="text"
                            {...register("phone", { required: { value: true, message: "שדה חובה" } })}
                        />
                    </div>
                    {errors.phone && <small style={{ color: "red" }}>{errors.phone.message}</small>}

                    {/* כתובת מייל */}
                    <div className={styles.inputGroup}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-envelope"></i>
                        </span>
                        <InputText
                            className={styles.inputField}
                            placeholder="כתובת מייל"
                            type="email"
                            {...register("email", { required: { value: true, message: "שדה חובה" } })}
                        />
                    </div>
                    {errors.email && <small style={{ color: "red" }}>{errors.email.message}</small>}

                    {/* מספר חדרים */}
                    <div className={styles.inputGroup}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-home"></i>
                        </span>
                        <InputText
                            className={styles.inputField}
                            placeholder="מספר חדרים"
                            type="number"
                            min="0"
                            {...register("rooms", { required: { value: true, message: "שדה חובה" } })}
                        />
                    </div>
                    {errors.rooms && <small style={{ color: "red" }}>{errors.rooms.message}</small>}

                    {/* מרחק */}
                    <div className={styles.inputGroup}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-compass"></i>
                        </span>
                        <InputText
                            className={styles.inputField}
                            placeholder="מרחק מקסימלי"
                            type="number"
                            min="0"
                            {...register("distance", { required: { value: true, message: "שדה חובה" } })}
                        />
                    </div>
                    {errors.distance && <small style={{ color: "red" }}>{errors.distance.message}</small>}

                    {/* צ'קבוקסים */}
                    <div className={styles.checkboxGroup}>
                        <div>
                            <Checkbox
                                inputId="internet"
                                checked={watch("internet")} // ערך נוכחי
                                onChange={(e) => setValue("internet", e.checked)} // עדכון בטופס
                            />
                            <label htmlFor="internet" className={styles.checkboxLabel}>חיבור לאינטרנט</label>
                        </div>
                        <div>
                            <Checkbox
                                inputId="kitchen"
                                checked={watch("kitchen")}
                                onChange={(e) => setValue("kitchen", e.checked)}
                            />
                            <label htmlFor="kitchen" className={styles.checkboxLabel}>מטבח</label>
                        </div>
                        <div>
                            <Checkbox
                                inputId="coffeeMachine"
                                checked={watch("coffeeMachine")}
                                onChange={(e) => setValue("coffeeMachine", e.checked)}
                            />
                            <label htmlFor="coffeeMachine" className={styles.checkboxLabel}>מכונת קפה</label>
                        </div>
                    </div>

                    {/* סטטוס - שדה מוסתר */}
                    <InputText
                        type="hidden"
                        value="מחפש"
                        {...register("status")}
                    />

                    {/* כפתור שמירה */}
                    <Button className={styles.submitButton} label="שמור" icon="pi pi-check" type="submit" />
                    {location && <ShowMarkerInTheMap lat={parseFloat(location.lat)} lon={parseFloat(location.lon)} />}
                </form>
            </Card>
        </div>
    );
}
