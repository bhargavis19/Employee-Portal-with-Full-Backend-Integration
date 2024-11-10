import { Request, Response } from 'express';
import { Buffer } from 'buffer';
import { z } from 'zod';
import DbClient from '../db.client';
import { ApplicationSchema, EmployeeAccessRequestSchema, HrUpdateSchema } from '../lib/zod-schemas';

export default class V1Services extends DbClient {
  constructor() {
    super();
    console.log('V1 Services init');
  }

  public getHrUpdates = (limit: number | undefined) => {
    return this.prisma.hRUpdates.findMany({
      where: { UpdateStatus: 'Active' },
      orderBy: { TimeOfUpdate: 'desc' },
      ...(limit ? { take: limit } : {}),
    });
  };

  public getContacts = ({ searchTerm = '' }: { searchTerm?: string }) => {
    return this.prisma.importantContacts.findMany({
      where: {
        OR: [
          { EmployeeName: { contains: searchTerm } },
          { EmployeeID: { contains: searchTerm } },
          { PhoneNumber: { equals: +searchTerm } },
          { Department: { contains: searchTerm } },
          { EmailAddress: { contains: searchTerm } },
        ],
      },
    });
  };

  public getHolidays = () => {
    return this.prisma.holidays.findMany();
  };

  public getCategories = () => {
    return this.prisma.categoryMaster.findMany();
  };

  public getSupports = ({ searchTerm = '' }: { searchTerm?: string }) => {
    return this.prisma.support.findMany({
      where: {
        OR: [
          { TeamName: { contains: searchTerm } },
          { TeamDept: { contains: searchTerm } },
          { TeamPhoneNumber: { equals: +searchTerm } },
          { EmailAddress: { contains: searchTerm } },
        ],
      },
    });
  };

  public requestAccess = async (data: z.infer<typeof EmployeeAccessRequestSchema>) => {
    return this.prisma.employeeAccessRequests.create({ data: data });
  };

  public hrUpdate = async (data: z.infer<typeof HrUpdateSchema>) => {
    return this.prisma.hRUpdates.create({
      data: { ...data, TimeOfUpdate: data.TimeOfUpdate ?? new Date() },
    });
  };

  public postApplication = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
  
      if (!data.ApplicationID || !data.ApplicationImage) {
        if (!res.headersSent) {
          res.status(400).json({ message: 'ApplicationID or ApplicationImage is missing' });
        }
        return; // Ensure no further code execution
      }
  
      const applicationsIDExists = await this.prisma.applications.findFirst({
        where: { ApplicationID: data.ApplicationID },
        select: { ApplicationID: true },
      });
  
      if (applicationsIDExists) {
        if (!res.headersSent) {
          res.status(400).json({ message: 'Duplicate application ID!' });
        }
        return; // Ensure no further code execution
      }
  
      // Convert image to Base64 if necessary
      const base64Image = await this.convertToBase64(data.ApplicationImage);
  
      const updatedData = {
        ...data,
        ApplicationImage: base64Image,
      };
  
      await this.prisma.applications.create({ data: updatedData });
  
      if (!res.headersSent) {
        res.status(200).json({ message: 'Application submitted successfully' });
      }
    } catch (error:any) {
      // Handle error and ensure headers are only sent once
      console.error('Error in postApplication:', error);
      if (!res.headersSent) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
      }
    }
  };
  

  private convertToBase64 = async (imageData: any): Promise<string> => {
    if (typeof imageData === 'string') {
      // If imageData is already a Base64 string
      return imageData;
    } else if (Buffer.isBuffer(imageData)) {
      // If imageData is a Buffer
      return imageData.toString('base64');
    } else if (imageData && typeof imageData === 'object' && 'data' in imageData) {
      // Handle image data in an object with a 'data' property
      return Buffer.from(imageData.data).toString('base64');
    } else {
      throw new Error('Unsupported image data format');
    }
  };
  
  private blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(',')[1]); // Remove the data URL part
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  public getApplications = async (categoryID?: string) => {
    const filters: Parameters<typeof this.prisma.applications.findMany>[0] = { where: {} };
    if (categoryID) {
      filters.where = { CategoryID: categoryID };
    }
    return this.prisma.applications.findMany(filters);
  };
}
