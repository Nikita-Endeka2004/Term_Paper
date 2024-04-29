import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(@InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>) {}
  async create(createTransactionDto: CreateTransactionDto, id: number) {
    const newTransaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      category: { id: +createTransactionDto.category},
      user: { id },
    }

    if(!newTransaction) throw new BadRequestException('Something went wrong...')

    return await this.transactionRepository.save(newTransaction)
  }

  async findAll(id: number) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: {id}
      },
      order: {
        crearedAt: 'DESC'
      }
    })
    return transactions
  }

  async findOne(id: number) {
    const transactions = await this.transactionRepository.findOne({
      where: {
        id
      },
      relations: {
        user: true,
        category: true
      }
    })
    if(!transactions) throw new NotFoundException('Transaction not found')
    return transactions
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transactions = await this.transactionRepository.findOne({
      where: {
        id
      }
    })

    if(!transactions) throw new NotFoundException('Transaction not found')
      
    return await this.transactionRepository.update(id, updateTransactionDto)
  }

  async remove(id: number) {
    const transactions = await this.transactionRepository.findOne({
      where: {
        id
      }
    })

    if(!transactions) throw new NotFoundException('Transaction not found')

    return await this.transactionRepository.delete(id)
  }
  async findAllwithPagination(id: number, page: number, limit: number){
    const transactions = await this.transactionRepository.find({
      where: {
        user: {id},
      },
      relations: {
        category: true,
        user: true
      },
      order: {
        crearedAt: 'DESC'
      },
      take: limit,
      skip: (page - 1) * limit
    })
    return transactions
  }

  async findAllByType(id: number, type: string){
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id },
        type,
      }
    })
    const total = transactions.reduce((acc, obj) => acc + obj.amount, 0)
    return total
  }

}
