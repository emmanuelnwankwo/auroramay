import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isEmpty } from 'class-validator';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(@InjectModel('Employee') private employeeModel: Model<Employee>) { }

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      await new this.employeeModel(createEmployeeDto).save();
      return;
    } catch (error) {
      const message = (!isEmpty(error._message)) ? error._message : ((!isEmpty(error.stringValue)) ? error.stringValue : error.message);
      throw new Error(message);
    }
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeModel.aggregate([{
      $project: {
        _id: 0,
        employee_id: '$_id',
        first_name: 1,
        last_name: 1,
        age: 1,
        join_date: 1
      }
    }]);
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findById(id, {
      _id: 0, first_name: 1, last_name: 1, age: 1, join_date: 1
    });
    if (employee === null) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND)
    }
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    let employee = await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto);
    if (employee === null) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND)
    }
    employee = await this.employeeModel.findOne({ _id: id }, {
      _id: 0, first_name: 1, last_name: 1, age: 1, join_date: 1
    });
    return employee;
  }

  async remove(id: string) {
    const employee = await this.employeeModel.findOne({ _id: id });
    if (employee === null) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND)
    }
    employee.deleteOne();
  }
}
