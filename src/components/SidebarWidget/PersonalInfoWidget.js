import React from 'react';
import Input from '../Ui/Input';

const PersonalInfoWidget = (props) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          name="names"
          id="names"
          required
          autoComplete="names"
          value={props.checkValue.names}
          onChange={props.handleOnChange}
          error={props.checkSubmitted && !props.checkValue.names ? 'Name is required' : null}
          placeholder="Enter your full name"
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          id="email"
          required
          autoComplete="email"
          value={props.checkValue.email}
          onChange={props.handleOnChange}
          error={props.checkSubmitted && !props.checkValue.email ? 'Email is required' : null}
          placeholder="your@email.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Phone Number"
          name="phoneNumber"
          id="phoneNumber"
          required
          autoComplete="phoneNumber"
          value={props.checkValue.phoneNumber}
          onChange={props.handleOnChange}
          error={props.checkSubmitted && !props.checkValue.phoneNumber ? 'Phone number is required' : null}
          placeholder="+250..."
        />

        <Input
          label="Physical Address"
          name="address"
          id="address"
          required
          autoComplete="address"
          value={props.checkValue.address}
          onChange={props.handleOnChange}
          error={props.checkSubmitted && !props.checkValue.address ? 'Address is required' : null}
          placeholder="Street, Building, Apartment"
        />
      </div>

      <Input
        label="City / Location"
        name="location"
        id="location"
        required
        autoComplete="location"
        value={props.checkValue.location}
        onChange={props.handleOnChange}
        error={props.checkSubmitted && !props.checkValue.location ? 'Location is required' : null}
        placeholder="Kigali, Kicukiro..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Expected Delivery Date"
          type="date"
          name="startDate"
          id="needDate"
          value={props.checkInDate ? new Date(props.checkInDate).toISOString().split('T')[0] : ''}
          onChange={(e) => props.onDateChange('needDate', e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />

        <Input
          label="Latest Deadline"
          type="date"
          name="endDate"
          id="deadline"
          value={props.checkOutDate ? new Date(props.checkOutDate).toISOString().split('T')[0] : ''}
          onChange={(e) => props.onDateChange('deadline', e.target.value)}
          min={props.checkInDate ? new Date(props.checkInDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
        />
      </div>
      
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">
        * All fields are required for secure processing
      </p>
    </div>
  );
};

export default PersonalInfoWidget;
