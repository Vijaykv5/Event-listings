export interface Event {
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  community: string;
}

export interface EventFormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  community: string;
  onCommunityChange: (value: string) => void;
}

export interface EventDateTimeProps {
  startDate?: Date;
  endDate?: Date;
  startTime?: string;
  endTime?: string;
  onStartDateChange: (newData: Partial<Event>) => void;
  onEndDateChange: (newData: Partial<Event>) => void;
}

export interface EventLocationProps {
  location: string;
  onLocationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface EventDescriptionProps {
  description: string;
  onDescriptionChange: (description: string) => void;
}

export interface ImageUploadProps {
  imageUrl: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} 